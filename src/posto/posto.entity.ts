import { Combustivel } from '../combustivel/combustivel.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('postos')
export class Posto {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @Column({ nullable: false})
    @ApiModelProperty()
    nome: string;

    @Column()
    @ApiModelProperty()
    endereco: string;

    @Column()
    @ApiModelProperty()
    bairro: string;

    @Column()
    @ApiModelProperty()
    cidade: string;

    @OneToMany(type => Combustivel, combustivel => combustivel.posto)
    @ApiModelProperty()
    combustiveis: Combustivel[];

    @Column({ default: 'Branca', nullable: true })
    @ApiModelProperty()
    bandeira: string;
}
