import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Musico from "./músico";
import Vaga from "./vaga";

export enum StatusInscricao { PENDENTE = "Pendente", APROVADA = "Aprovada", RECUSADA = "Recusada" }

@Entity()
export default class Inscricao extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "date" }) data_inscrição: Date;
  @Column({ type: "enum", enum: StatusInscricao, default: StatusInscricao.PENDENTE }) status: StatusInscricao;
  @Column() mensagem: string;
  @Column({ default: false }) aprovada: boolean;
  @ManyToOne(() => Musico, (musico) => musico.inscrições, { onDelete: "CASCADE" })
  músico: Musico;
  @ManyToOne(() => Vaga, (vaga) => vaga.inscrições, { onDelete: "CASCADE" })
  vaga: Vaga;
}