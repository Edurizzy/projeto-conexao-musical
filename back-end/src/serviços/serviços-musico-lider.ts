import { getManager } from "typeorm";
import MusicoLider from "../entidades/musico-lider";
import Usuario, { Status } from "../entidades/usuario";
import ServicosUsuario from "./serviços-usuário";
import md5 from "md5";

export default class ServicosMusicoLider {
  static async cadastrarMusicoLider(request, response) {
    try {
      const { usuario_info, nome_banda, genero_musical } = request.body;
      const { usuario, token } = await ServicosUsuario.cadastrarUsuario(usuario_info);
      const entityManager = getManager();

      await entityManager.transaction(async (tm) => {
        await tm.save(usuario);
        const lider = MusicoLider.create({ usuario, nome_banda, genero_musical });
        await tm.save(lider);
        await tm.update(Usuario, usuario.cpf, { status: Status.ATIVO });
      });
      return response.json({ status: Status.ATIVO, token });
    } catch (error) { return response.status(500).json({ erro: error.message }); }
  }

  static async buscarMusicoLider(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const lider = await MusicoLider.findOne({ where: { usuario: cpf_encriptado }, relations: ["usuario"] });
      if (!lider) return response.status(404).json({ erro: "Músico líder não encontrado." });
      
      return response.json({
        nome: lider.usuario.nome, email: lider.usuario.email,
        nome_banda: lider.nome_banda, genero_musical: lider.genero_musical,
      });
    } catch (error) { return response.status(500).json({ erro: "Erro ao buscar músico líder" }); }
  }
}