import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard, RolesGuard } from "../guards";

export function Auth() {
    return applyDecorators(
        UseGuards(JwtAuthGuard,RolesGuard),
        ApiBearerAuth()
    )
    
};