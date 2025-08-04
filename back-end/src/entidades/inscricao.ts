import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Musico from "./musico";
import Vaga from "./vaga";

export enum StatusInscricao { PENDENTE = "Pendente", APROVADA = "Aprovada", RECUSADA = "Recusada" }

@Entity()
export default class Inscricao extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "date" }) data_inscricao: Date;
  @Column({ type: "enum", enum: StatusInscricao, default: StatusInscricao.PENDENTE }) status: StatusInscricao;
  @Column() mensagem: string;
  @ManyToOne(() => Musico, (musico) => musico.inscricoes, { onDelete: "CASCADE" })
  musico: Musico;
  @ManyToOne(() => Vaga, (vaga) => vaga.inscricoes, { onDelete: "CASCADE" })
  vaga: Vaga;
}