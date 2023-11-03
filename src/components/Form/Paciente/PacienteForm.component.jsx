import { useNavigate } from "react-router-dom";
import * as Styled from "./PacienteForm.style";

export const FormPacienteComponent = () => {

    const genero = [
        {value: 'Feminino', label: 'Feminino'},
        {value: 'Masculino', label: 'Masculino'},
    ]

    const estadoCivil = [
        {value: 'Solteiro', label: 'Solteiro'},
        {value: 'Casado', label: 'Casado'},
        {value: 'Divorciado', label: 'Divorciado'},
        {value: 'Viúvo', label: 'Viúvo'},
        {value: 'União estável', label: 'União estável'}
    ]

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        setValue,
        watch,
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        async function request() {
           await fetch(`https://viacep.com.br/ws/${watch('cep')}/json/`)
        .then((res) => res.json())
        .then((data) => {
            setValue('logradouro', data.logradouro)
            setValue('cidade', data.cidade)
            setValue('estado', data.uf)
            setValue('bairro', data.bairro)
        })
        .catch((error) => console.error('Erro na requisição: ', error));
        }
        watch('cep').length > 7 && request();
    }, [watch('cep')]);

    const submitForm = (data) => {
        const { cpf } = data;
        console.log(data);

        if (PacienteService.ShowByCpf(cpf)) {
            alert('Paciente já cadastrado');
            reset();
            return
        }

        PacienteService.criarPacientes(data);

        const {pacienteId} = PacienteService.ShowByCpf(cpf)
        navigate(`/pacientes/${pacienteId}`)
    }

    return (
        <Styled.Form  onSubmit={handleSubmit(submitForm)}> 
            <Styled.InputGroup className="InputGroup">
                <Styled.Titles>Dados do Paciente</Styled.Titles>
                <InputComponent 
                    label='Nome Completo' 
                    id='nome' 
                    type='text' 
                    register={{...register('nome', {
                        required: true,
                        minLength: {
                            value: 8,
                            message: 'O nome deve ter pelo menos 8 caracteres'
                        },
                        maxLength: {
                            value: 64,
                            message: 'O nome não pode exceder 64 caracteres'
                        }
                    })}}
                    error= {errors.nome}
                />
                <Styled.InputRow className="InputRow">
                    <InputComponent 
                    label='genero' 
                    id='genero' 
                    type='select' 
                    options={genero}
                    register={{...register('genero', {
                        required: true, 
                    })}}
                    error={errors.genero}
                    />
                    <InputComponent label='Data de Nascimento' id='nascimento' type='date'
                    register={{...register('nascimento', {
                        required: true
                    })}}
                        error={errors.nascimento}
                    />
                    <InputComponent label='Estado Civil' id='estadoCivil' type='select' options={estadoCivil}
                    register={{...register('estadoCivil', {
                        required: true, 
                    })}}
                    error={errors.estadoCivil}
                    />
                </Styled.InputRow>
                <Styled.InputRow className="InputRow">
                    <InputComponent label='CPF' id='cpf' type='text' placeholder='000.000.000-00'
                    register={{...register('cpf', {
                        required: true,
                        pattern: {
                            value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                            message: 'CPF inválido.'
                        }
                    })}}
                    error={errors.cpf}    
                    />
                    <InputComponent label='RG' id='rg' type='text'
                    register={{...register('rg', {
                        required: true,
                        maxLength: 20
                    })}}
                    error= {errors.rg}
                    />
                    <InputComponent label='naturalidade' id='naturalidade' type='text'
                    register={{...register('naturalidade', {
                        required: true,
                        minLength: {
                            value: 8
                        },
                        maxLength: {
                            value: 64
                        }
                    })}}
                    error= {errors.naturalidade}
                    />
                </Styled.InputRow>
                <Styled.InputRow className="InputRow">
                    <InputComponent label='Telefone' id='telefone' type='text' placeholder='(99) 9 9999-9999'
                    register={{...register('telefone', {
                        required: true,
                        pattern: {
                            value: /^\(\d{2}\) \d \d{4}-\d{4}$/,
                            message: 'Telefone inválido.'
                        }
                    })}}
                    error={errors.telefone}
                    />
                    <InputComponent label='E-mail' id='email' type='email'
                    register={{...register('email', {
                        required: true,
                        validate:  {matchPath: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)}
                    })}}
                        error={errors.email}
                    />
                    <InputComponent label='Contato de Emergência' id='contatoEmergencia' type='text' placeholder='(99) 9 9999-9999'
                    register={{...register('contatoEmergencia', {
                        required: true,
                        pattern: {
                            value: /^\(\d{2}\) \d \d{4}-\d{4}$/,
                            message: 'Telefone inválido.'
                        }
                    })}}
                    error={errors.contatoEmergencia}
                    />
                </Styled.InputRow>
                <Styled.InputRow className="InputRow">
                    <InputComponent label='Alergias' id='alergias' type='textarea'
                    register={{...register('alergias')}}
                    />
                    <InputComponent label='Cuidados Especiais' id='cuidadosEspeciais' type='textarea'
                        register={{...register('cuidadosEspeciais')}}
                    />
                </Styled.InputRow>
            </Styled.InputGroup>
            <Styled.InputGroup className="InputGroup">
                <Styled.Titles>Convênio</Styled.Titles>
                <InputComponent label='Convênio' id='convenio' type='text'
                    register={{...register('convenio')}}
                />
                <Styled.InputRow>
                    <InputComponent label='Número do Convênio' id='numeroConvenio' type='text'
                        register={{...register('numeroConvenio')}}
                    />
                    <InputComponent label='Validade do Convênio' id='validadeConvenio' type='date'
                        register={{...register('validadeConvenio')}}
                    />
                </Styled.InputRow>
            </Styled.InputGroup>
            <Styled.InputGroup className="InputGroup">
                <Styled.Titles>Dados de Endereço</Styled.Titles>
                <Styled.InputRow>
                    <InputComponent label='CEP' id='cep' type='text'
                    register={{...register('cep', {
                        required: true
                    })}}
                    error={errors.cep}
                    />
                    <InputComponent label='Cidade' id='cidade' type='text' justRead={true}
                    register={{...register('cidade', {
                        required: true
                    })}}
                    error={errors.city}
                    />
                    <InputComponent label='Estado' id='estado' type='text' justRead={true}
                    register={{...register('estado', {
                        required: true
                    })}}
                    error={errors.state}  
                    />
                </Styled.InputRow>
                <Styled.InputRow>
                    <InputComponent label='Logradouro' id='logradouro' type='text' justRead={true}
                        register={{...register('logradouro', {
                            required: true
                        })}}
                        error={errors.place}
                    />
                    <InputComponent label='Número' id='numero' type='text'
                        register={{...register('numero', {
                            required: true
                        })}}
                        error={errors.numero}
                    />
                </Styled.InputRow>
                <Styled.InputRow>
                    <InputComponent label='Complemento' id='complemento' type='text'
                        register={{...register('complemento')}}
                    />
                    <InputComponent label='Bairro' id='bairro' type='text' justRead={true}
                        register={{...register('bairro', {
                            required: true
                        })}}
                        error={errors.bairro}
                    />
                </Styled.InputRow>
                <InputComponent label='Ponto de Referência' id='pontoReferencia' type='text'
                    register={{...register('pontoReferencia')}}
                />
            </Styled.InputGroup>
            <Styled.ButtonsWrapper>
                    <Styled.Button $active={!Object(errors).length} type="button" disabled={Object(errors).length}>Editar</Styled.Button>
                    <Styled.Button $color='red' $active={!Object(errors).length} type="button" disabled={Object(errors).length}>Deletar</Styled.Button>
                    <Styled.Button  $active={!Object(errors).length} type='submit' disabled={Object(errors).length}>Salvar</Styled.Button>
            </Styled.ButtonsWrapper>
        </Styled.Form>
    )
}