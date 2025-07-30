import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Usuario from "./usuario";
import Colaboracao from "./colaboracao";

@Entity()
export default class MusicoCandidato extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() instrumento_principal: string;
  @Column() anos_experiencia: number;
  @OneToOne(() => Colaboracao, (colaboracao) => colaboracao.musico_candidato) colaboracao: Colaboracao;
  @OneToOne(() => Usuario, (usuario) => usuario.musico_candidato, { onDelete: "CASCADE" })
  @JoinColumn()
  usuario: Usuario;
}