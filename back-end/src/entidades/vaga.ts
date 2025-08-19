import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import LiderBanda from "./líder-banda";
import Inscricao from "./inscrição";

export enum NivelHabilidade { INICIANTE = "Iniciante", INTERMEDIARIO = "Intermediário", AVANCADO = "Avançado" }

@Entity()
export default class Vaga extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() titulo: string;
  @Column() instrumento_requerido: string;
  @Column() descricao: string;
  @Column() remunerada: boolean;
  @Column({ type: "enum", enum: NivelHabilidade }) nivel_habilidade: NivelHabilidade;
  @ManyToOne(() => LiderBanda, (lider_banda) => lider_banda.vagas, { onDelete: "CASCADE" })
  líder_banda: LiderBanda;
  @OneToMany(() => Inscricao, (inscricao) => inscricao.vaga) inscrições: Inscricao[];
}