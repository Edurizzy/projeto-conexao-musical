import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import LiderBanda from "./lider-banda";
import Musico from "./musico";

export enum Perfil { LIDER_BANDA = "lider_banda", MUSICO = "musico" }
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
  @OneToOne(() => LiderBanda, (lider) => lider.usuario) lider_banda: LiderBanda;
  @OneToOne(() => Musico, (musico) => musico.usuario) musico: Musico;
}