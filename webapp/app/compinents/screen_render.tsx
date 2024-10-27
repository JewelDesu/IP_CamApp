"use client";

//import { useState } from "react";
import * as React from "react";

import { Videomjpeg } from "./videomjpeg"

export const Renderscreen = () => {
    for(let i=0;i<2;i++){
        return(
            <div>
                <Videomjpeg/>
            </div>
        )
    }
}