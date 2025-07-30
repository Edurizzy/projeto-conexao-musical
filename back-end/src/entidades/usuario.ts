import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import MusicoLider from "./musico-lider";
import MusicoCandidato from "./musico-candidato";

export enum Perfil {
  MUSICO_LIDER = "musico_lider",
  MUSICO_CANDIDATO = "musico_candidato",
}
export enum Status { PENDENTE = "pendente", ATIVO = "ativo" }
export enum Cores {
    AMARELO = "yellow", ANIL = "indigo", AZUL = "blue", AZUL_PISCINA = "cyan",
    CINZA_ESCURO = "bluegray", LARANJA = "orange", ROSA = "pink", ROXO = "purple",
    VERDE = "green", VERDE_AZULADO = "teal"
}

@Entity()
export default class Usuario extends BaseEntity {
  @PrimaryColumn() cpf: string;
  @Column({ type: "enum", enum: Perfil }) perfil: Perfil;
  @Column({ type: "enum", enum: Status, default: Status.PENDENTE }) status: Status;
  @Column() nome: string;
  @Column() email: string;
  @Column() senha: string;
  @Column() questão: string;
  @Column() resposta: string;
  @Column({ type: "enum", enum: Cores }) cor_tema: string;
  @OneToOne(() => MusicoLider, (lider) => lider.usuario) musico_lider: MusicoLider;
  @OneToOne(() => MusicoCandidato, (candidato) => candidato.usuario) musico_candidato: MusicoCandidato;
}