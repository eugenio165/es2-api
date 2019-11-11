import { ApiModelProperty } from "@nestjs/swagger";

export class Point {
    @ApiModelProperty()
    longitude: number;

    @ApiModelProperty()
    latitude: number;
}