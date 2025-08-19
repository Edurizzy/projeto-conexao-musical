import { getManager } from "typeorm";
import Musico from "../entidades/músico";
import Usuario, { Status } from "../entidades/usuário";
import ServicosUsuario from "./serviços-usuário";
import md5 from "md5";
import { sign } from "jsonwebtoken";

const SENHA_JWT = process.env.SENHA_JWT;

export default class ServicosMusico {
  static async cadastrarMusico(request, response) {
    try {
      const { usuario_info, instrumento_principal, anos_experiencia, disponibilidade } = request.body;
      
      const { usuario } = await ServicosUsuario.cadastrarUsuario(usuario_info);
      
      const entityManager = getManager();

      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuario);
        const musico = Musico.create({ usuario, instrumento_principal, anos_experiencia, disponibilidade });
        await transactionManager.save(musico);
        await transactionManager.update(Usuario, usuario.cpf, { status: Status.ATIVO });
      });

      const token = sign({ perfil: usuario.perfil }, SENHA_JWT, { subject: usuario.nome, expiresIn: "1d" });

      return response.json({ status: Status.ATIVO, token });

    } catch (error) {
      return response.status(500).json({ erro: error.message });
    }
  }

  static async buscarMusico(request, response) {
    try {
      const cpfLimpo = request.params.cpf.replace(/[.-]/g, '');
      const cpf_encriptado = md5(cpfLimpo);
      const musico = await Musico.findOne({ where: { usuario: cpf_encriptado }, relations: ["usuario"] });
      
      if (!musico) return response.status(404).json({ erro: "Músico não encontrado." });
      
      return response.json({
        nome: musico.usuario.nome, email: musico.usuario.email,
        instrumento_principal: musico.instrumento_principal, 
        anos_experiencia: musico.anos_experiencia,
        disponibilidade: musico.disponibilidade
      });
    } catch (error) {
      return response.status(500).json({ erro: "Erro ao buscar músico." });
    }
  }
}