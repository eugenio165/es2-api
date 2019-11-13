import { Combustivel } from './../combustivel/combustivel.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Geography } from 'geojson';

@Entity('postos')
export class Posto {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @Column()
    @ApiModelProperty()
    nome: string;

    @Column()
    @ApiModelProperty()
    endereco: string;

    @Column('geography', {
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: true
    })
    @Index({ spatial: true })
    geo_ponto: Geography;

    @Column()
    @ApiModelProperty()
    bairro: string;

    @Column()
    @ApiModelProperty()
    cidade: string;

    @OneToMany(type => Combustivel, combustivel => combustivel.posto)
    @ApiModelProperty({ type: Combustivel, isArray: true })
    combustiveis: Combustivel[];

    @Column({ nullable: true })
    @ApiModelProperty()
    googlePlaceId: string;

    @Column({ nullable: true })
    googleRating: string;

    @Column({ default: 'Branca', nullable: true })
    @ApiModelProperty()
    bandeira: string;
}
