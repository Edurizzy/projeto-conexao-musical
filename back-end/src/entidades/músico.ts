import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Usuario from "./usuário";
import Inscricao from "./inscrição";

export enum Disponibilidade { FINS_DE_SEMANA = "Fins_De_Semana", NOITES = "Noites", INTEGRAL = "Integral" }

@Entity()
export default class Musico extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() instrumento_principal: string;
  @Column() anos_experiencia: number;
  @Column({ type: "enum", enum: Disponibilidade }) disponibilidade: Disponibilidade;
  @OneToMany(() => Inscricao, (inscricao) => inscricao.músico) inscrições: Inscricao[];
  @OneToOne(() => Usuario, (usuario) => usuario.músico, { onDelete: "CASCADE" })
  @JoinColumn()
  usuario: Usuario;
}