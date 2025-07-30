import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import MusicoLider from "./musico-lider";
import MusicoCandidato from "./musico-candidato";

export enum InstrumentoDesejado {
  VOCAL = "Vocal", GUITARRA = "Guitarra", BAIXO = "Baixo", BATERIA = "Bateria", TECLADO = "Teclado",
}
export enum NivelHabilidade {
  INICIANTE = "Iniciante", INTERMEDIARIO = "Intermediario", AVANCADO = "Avancado",
}
export enum StatusColaboracao {
  ABERTA = "Aberta", EM_NEGOCIACAO = "EmNegociacao", FECHADA = "Fechada",
}

@Entity()
export default class Colaboracao extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "enum", enum: InstrumentoDesejado }) instrumento_desejado: InstrumentoDesejado;
  @Column({ type: "enum", enum: NivelHabilidade }) nivel_habilidade: NivelHabilidade;
  @Column({ type: "enum", enum: StatusColaboracao, default: StatusColaboracao.ABERTA }) status: StatusColaboracao;
  @ManyToOne(() => MusicoLider, (lider) => lider.colaboracoes, { onDelete: "CASCADE" }) musico_lider: MusicoLider;
  @OneToOne(() => MusicoCandidato, (candidato) => candidato.colaboracao, { nullable: true })
  @JoinColumn()
  musico_candidato: MusicoCandidato;
}