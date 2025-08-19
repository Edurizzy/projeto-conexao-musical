import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import LiderBanda from "./líder-banda";
import Musico from "./músico";

export enum Perfil { LIDER_BANDA = "LíderBanda", MUSICO = "Músico" }
export enum Status { PENDENTE = "Pendente", ATIVO = "Ativo" }
export enum Cores {
    ANIL = "anil", AZUL = "azul", AZUL_PISCINA = "azul_piscina",
    CINZA_ESCURO = "cinza_escuro", LARANJA = "laranja", ROSA = "rosa", ROXO = "roxo",
    VERDE = "verde", VERDE_AZULADO = "verde_azulado"
}

@Entity()
export default class Usuario extends BaseEntity {
  @PrimaryColumn() cpf: string;
  @Column() nome: string;
  @Column() email: string;
  @Column({ type: "enum", enum: Perfil }) perfil: Perfil;
  @Column({ type: "enum", enum: Status, default: Status.PENDENTE }) status: Status;
  @Column() senha: string;
  @Column() questão: string;
  @Column() resposta: string;
  @Column({ type: "enum", enum: Cores }) cor_tema: string;
  @OneToOne(() => LiderBanda, (lider_banda) => lider_banda.usuario) líder_banda: LiderBanda;
  @OneToOne(() => Musico, (musico) => musico.usuario) músico: Musico;
}