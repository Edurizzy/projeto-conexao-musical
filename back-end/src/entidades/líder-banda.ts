import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Usuario from "./usuário";
import Vaga from "./vaga";

export enum PerfilBanda { AUTORAL = "Autoral", COVER = "Cover", TRIBUTO = "Tributo" }

@Entity()
export default class LiderBanda extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "enum", enum: PerfilBanda }) perfil_banda: PerfilBanda;
  @Column() genero_musical: string;
  @Column() cidade: string;
  @OneToMany(() => Vaga, (vaga) => vaga.líder_banda) vagas: Vaga[];
  @OneToOne(() => Usuario, (usuario) => usuario.líder_banda, { onDelete: "CASCADE" })
  @JoinColumn()
  usuario: Usuario;
}