import { getManager } from "typeorm";
import LiderBanda from "../entidades/lider-banda";
import Usuario, { Status } from "../entidades/usuario";
import ServicosUsuario from "./serviços-usuario";
import md5 from "md5";
import { sign } from "jsonwebtoken";

const SENHA_JWT = process.env.SENHA_JWT;

export default class ServicosLiderBanda {
  static async cadastrarLiderBanda(request, response) {
    try {
      const { usuario_info, perfil_banda, genero_musical } = request.body;
      const { usuario } = await ServicosUsuario.cadastrarUsuario(usuario_info);
      const entityManager = getManager();

      await entityManager.transaction(async (tm) => {
        await tm.save(usuario);
        const lider = LiderBanda.create({ usuario, perfil_banda, genero_musical });
        await tm.save(lider);
        await tm.update(Usuario, usuario.cpf, { status: Status.ATIVO });
      });

      const token = sign({ perfil: usuario.perfil }, SENHA_JWT, { subject: usuario.nome, expiresIn: "1d" });
      return response.json({ status: Status.ATIVO, token });

    } catch (error) { return response.status(500).json({ erro: error.message }); }
  }

  static async buscarLiderBanda(request, response) {
    try {
      const cpfLimpo = request.params.cpf.replace(/[.-]/g, '');
      const cpf_encriptado = md5(cpfLimpo);
      const lider = await LiderBanda.findOne({ where: { usuario: cpf_encriptado }, relations: ["usuario"] });
      if (!lider) return response.status(404).json({ erro: "Líder de banda não encontrado." });
      
      return response.json({
        nome: lider.usuario.nome, email: lider.usuario.email,
        perfil_banda: lider.perfil_banda, genero_musical: lider.genero_musical,
      });
    } catch (error) { return response.status(500).json({ erro: "Erro ao buscar líder de banda." }); }
  }
}