import { Api } from './Api';

class ProviderServe{

    userName = '';
    
    getNoites(){
        return Api.getNoites('noites'); 
    }

    agendar(data: {}){
        return Api.post('agendamentos', data);
    }

    logar(data: {}){
        return Api.post('users/login', data);
    }

    cadastrar(data: {}){
        return Api.post('users', data);
    }

    getUser(user: string){
        return Api.get('users/userName', {'userName': user});
    }

    getAgendamento(id: string){
        return Api.getAgendamento('agendamentos/get/', id);
    }

    cancelarAgendamento(ids: {}){
    return Api.cancelarAgendamento(`agendamentos/cancel`, ids);
    }
}

export const Provider = new ProviderServe();