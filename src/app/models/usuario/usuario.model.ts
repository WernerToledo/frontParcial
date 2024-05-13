import { Rol } from "../Roles/rol.model";

export class Usuario {
    idUsuario?: number;
    nombres?: string;
    apellidos?: string;
    username?: string;
    estado?: string;
    passwordUser?: string;
    rol?: Rol;

    constructor(idUsuario?: number, nombres?: string, apellidos?: string, username?: string, estado?: string, passwordUser?: string,
        rol?: Rol){
        this.idUsuario = idUsuario;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.username = username;
        this.estado = estado;
        this.passwordUser = passwordUser;
        this.rol = rol;
    }
}
