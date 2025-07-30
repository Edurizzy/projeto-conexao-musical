import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Usuario from "./usuario";
import Colaboracao from "./colaboracao";

@Entity()
export default class MusicoLider extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() nome_banda: string;
  @Column() genero_musical: string;
  @OneToMany(() => Colaboracao, (colaboracao) => colaboracao.musico_lider) colaboracoes: Colaboracao[];
  @OneToOne(() => Usuario, (usuario) => usuario.musico_lider, { onDelete: "CASCADE" })
  @JoinColumn()
  usuario: Usuario;
}