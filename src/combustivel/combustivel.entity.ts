import { Posto } from './../posto/posto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('combustiveis')
export class Combustivel {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @Column({ nullable: false})
    @ApiModelProperty()
    nome: string;

    @Column()
    @ApiModelProperty()
    preco: number;

    @Column({ nullable: true })
    @ApiModelProperty()
    data: Date;

    @ManyToOne(type => Posto, posto => posto.combustiveis)
    @ApiModelProperty()
    posto: Posto;
}
