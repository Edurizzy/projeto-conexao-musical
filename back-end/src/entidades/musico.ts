import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Usuario from "./usuario";
import Inscricao from "./inscricao";

export enum Disponibilidade { FINS_DE_SEMANA = "Fins de Semana", NOITES = "Noites", INTEGRAL = "Integral" }

@Entity()
export default class Musico extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "enum", enum: Disponibilidade }) disponibilidade: Disponibilidade;
  @Column() instrumento_principal: string;
  @OneToMany(() => Inscricao, (inscricao) => inscricao.musico) inscricoes: Inscricao[];
  @OneToOne(() => Usuario, (usuario) => usuario.musico, { onDelete: "CASCADE" })
  @JoinColumn()
  usuario: Usuario;
}