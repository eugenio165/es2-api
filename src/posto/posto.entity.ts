import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('postos')
export class Posto {
    @PrimaryGeneratedColumn('uuid')
    @ApiModelProperty()
    id: string;

    @Column({ nullable: false})
    @ApiModelProperty()
    nome: string;

    @Column()
    @ApiModelProperty()
    endereco: string;

    @Column({ default: 'Branca', nullable: true })
    @ApiModelProperty()
    bandeira: string;
}
