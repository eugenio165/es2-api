import { Posto } from './../posto/posto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import * as moment from 'moment';

@Entity('combustiveis')
export class Combustivel {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @Column({ nullable: false})
    @ApiModelProperty()
    nome: string;

    @Column({ type: 'decimal', precision: 4, scale: 2 })
    @ApiModelProperty()
    preco: number;

    @Column({ type: 'date', nullable: true })
    @ApiModelProperty()
    data: Date;

    @ManyToOne(type => Posto, posto => posto.combustiveis )
    @ApiModelProperty()
    posto: Posto;
}
