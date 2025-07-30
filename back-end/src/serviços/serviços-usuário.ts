import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import md5 from "md5";
import { sign } from "jsonwebtoken";
import Usuario, { Perfil } from "../entidades/usuario";
import MusicoLider from "../entidades/musico-lider";
import MusicoCandidato from "../entidades/musico-candidato";

dotenv.config();
const SALT = 8;
const SENHA_JWT = process.env.SENHA_JWT;

export default class ServicosUsuario {
  static async verificarCpfExistente(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const usuario = await Usuario.findOne(cpf_encriptado);
      if (usuario) return response.status(400).json({ erro: "CPF já cadastrado." });
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro ao verificar CPF." }); }
  }

  static async verificarCadastroCompleto(usuario: Usuario) {
    if (usuario.perfil === Perfil.MUSICO_LIDER) {
      const lider = await MusicoLider.findOne({ where: { usuario: usuario.cpf } });
      return !!lider;
    }
    if (usuario.perfil === Perfil.MUSICO_CANDIDATO) {
      const candidato = await MusicoCandidato.findOne({ where: { usuario: usuario.cpf } });
      // Para a Etapa 1, consideramos que o cadastro do candidato está completo ao se criar.
      // Em etapas futuras, pode haver um cadastro específico para ele.
      return true;
    }
    return false;
  }

  static async logarUsuario(request, response) {
    try {
      const { nome_login, senha } = request.body;
      const cpf_encriptado = md5(nome_login);
      const usuario = await Usuario.findOne(cpf_encriptado);

      if (!usuario) return response.status(404).json({ erro: "Usuário não cadastrado." });

      const cadastroCompleto = await ServicosUsuario.verificarCadastroCompleto(usuario);
      if (!cadastroCompleto) {
        await Usuario.remove(usuario);
        return response.status(400).json({ erro: "Cadastro incompleto. Realize o cadastro novamente." });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) return response.status(401).json({ erro: "Senha incorreta." });

      const token = sign({ perfil: usuario.perfil }, SENHA_JWT, { subject: usuario.nome, expiresIn: "1d" });
      return response.json({
        usuarioLogado: { nome: usuario.nome, perfil: usuario.perfil, status: usuario.status, cor_tema: usuario.cor_tema, token },
      });
    } catch (error) { return response.status(500).json({ erro: "Erro ao fazer login." }); }
  }

  static async cadastrarUsuario(usuario_informado) {
    try {
      const { cpf, nome, perfil, email, senha, questão, resposta, cor_tema } = usuario_informado;
      const cpf_encriptado = md5(cpf);
      const senha_encriptada = await bcrypt.hash(senha, SALT);
      const resposta_encriptada = await bcrypt.hash(resposta, SALT);
      
      const usuario = Usuario.create({
        cpf: cpf_encriptado, nome, perfil, email, senha: senha_encriptada, questão,
        resposta: resposta_encriptada, cor_tema,
      });

      const token = sign({ perfil: usuario.perfil }, SENHA_JWT, { subject: usuario.nome, expiresIn: "1d" });
      return { usuario, token };
    } catch (error) { throw new Error("Erro ao cadastrar usuário."); }
  }
}