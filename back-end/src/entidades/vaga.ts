import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import LiderBanda from "./lider-banda.ts";
import Inscricao from "./inscricao";

@Entity()
export default class Vaga extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() titulo: string;
  @Column() instrumento_requerido: string;
  @Column() nivel_habilidade: string;
  @ManyToOne(() => LiderBanda, (lider) => lider.vagas, { onDelete: "CASCADE" })
  lider_banda: LiderBanda;
  @OneToMany(() => Inscricao, (inscricao) => inscricao.vaga) inscricoes: Inscricao[];
}