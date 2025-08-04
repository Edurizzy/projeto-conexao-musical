import { getManager } from "typeorm";
import LiderBanda from "../entidades/lider-banda";
import Usuario, { Status } from "../entidades/usuario";
import ServicosUsuario from "./serviços-usuario"; // Importamos o serviço auxiliar
import md5 from "md5";
import { sign } from "jsonwebtoken"; // Importamos a função para criar o token

const SENHA_JWT = process.env.SENHA_JWT;

export default class ServicosLiderBanda {
  static async cadastrarLiderBanda(request, response) {
    try {
      const { usuario_info, perfil_banda, genero_musical } = request.body;
      
      // 1. Prepara o objeto do usuário (sem salvar)
      const { usuario } = await ServicosUsuario.cadastrarUsuario(usuario_info);
      
      const entityManager = getManager();

      // 2. Executa a transação no banco de dados
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuario); // Salva o usuário base
        const lider = LiderBanda.create({ usuario, perfil_banda, genero_musical });
        await transactionManager.save(lider); // Salva os dados específicos do líder
        await transactionManager.update(Usuario, usuario.cpf, { status: Status.ATIVO }); // Ativa o usuário
      });

      // 3. CRIA O TOKEN DE SESSÃO APÓS O SUCESSO
      const token = sign({ perfil: usuario.perfil }, SENHA_JWT, { subject: usuario.nome, expiresIn: "1d" });

      // 4. Retorna a resposta de sucesso com o status e o token
      return response.json({ status: Status.ATIVO, token });

    } catch (error) {
      // Se qualquer passo falhar, retorna um erro claro
      return response.status(500).json({ erro: error.message });
    }
  }

  // A função de buscar permanece a mesma
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
    } catch (error) {
      return response.status(500).json({ erro: "Erro ao buscar líder de banda." });
    }
  }
}