import { useState } from 'react';
import * as Styled from './ConsultaForm.style';

export const ConsultaComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [motivoConsulta, setMotivoConsulta] = useState('');
    const [dataConsulta, setDataConsulta] = useState(new Date());
    const [horarioConsulta, setHorarioConsulta] = useState('');
    const [descricaoProblema, setDescricaoProblema] = useState('');
    const [medicacaoReceitada, setMedicacaoReceitada] = useState('');
    const [dosagemPrecaucoes, setDosagemPrecaucoes] = useState('');
    const [statusSistema, setStatusSistema] = useState(true);

    const submitForm = (data) => {
        if (data.motivoConsulta.length < 8 || data.motivoConsulta.length > 64) {
            alert('Motivo da consulta deve ter entre 8 e 64 caracteres.');
            return;
        }
        if (data.descricaoProblema.length < 16 || data.descricaoProblema.length > 1024) {
            alert('Descrição do problema deve ter entre 16 e 1024 caracteres.');
            return;
        }
        if (data.dosagemPrecaucoes.length < 16 || data.dosagemPrecaucoes.length > 256) {
            alert('Dosagem e precauções devem ter entre 16 e 256 caracteres.');
            return;
        }

        const consultaId = generateUniqueId();

        ConsultaService.criarConsulta({ id: consultaId, ...data });
        history.push(`/consultas/${consultaId}`);
        navigate(`/consultas/${consultaId}`);
    };

    return (
        <Styled.Form onSubmit={handleSubmit(submitForm)}>
            <Styled.InputGroup className="InputGroup">
                <Styled.Titles>Dados da Consulta</Styled.Titles>
                <InputComponent
                    label="Motivo da Consulta"
                    id="motivoConsulta"
                    type="text"
                    register={register('motivoConsulta', {
                        required: true,
                    })}
                    error={errors.motivoConsulta}
                />
                <InputComponent
                    label="Data da Consulta"
                    id="dataConsulta"
                    type="date"
                    value={dataConsulta}
                    onChange={(e) => setDataConsulta(e.target.value)}
                    register={register('dataConsulta', {
                        required: true,
                    })}
                    error={errors.dataConsulta}
                />
                <InputComponent
                    label="Horário da Consulta"
                    id="horarioConsulta"
                    type="time"
                    value={horarioConsulta}
                    onChange={(e) => setHorarioConsulta(e.target.value)}
                    register={register('horarioConsulta', {
                        required: true,
                    })}
                    error={errors.horarioConsulta}
                />
                <InputComponent
                    label="Descrição do Problema"
                    id="descricaoProblema"
                    type="textarea"
                    register={register('descricaoProblema', {
                        required: true,
                    })}
                    error={errors.descricaoProblema}
                />
                <InputComponent
                    label="Medicação Receitada"
                    id="medicacaoReceitada"
                    type="text"
                    value={medicacaoReceitada}
                    onChange={(e) => setMedicacaoReceitada(e.target.value)}
                />
                <InputComponent
                    label="Dosagem e Precauções"
                    id="dosagemPrecaucoes"
                    type="textarea"
                    register={register('dosagemPrecaucoes', {
                        required: true,
                    })}
                    error={errors.dosagemPrecaucoes}
                />
                <InputComponent
                    label="Status do Sistema"
                    id="statusSistema"
                    type="checkbox"
                    checked={statusSistema}
                    onChange={(e) => setStatusSistema(e.target.checked)}
                />
            </Styled.InputGroup>
            <Styled.ButtonsWrapper>
                <Styled.Button type="button">Editar</Styled.Button>
                <Styled.Button $color="red" type="button">Deletar</Styled.Button>
                <Styled.Button type="submit">Salvar</Styled.Button>
            </Styled.ButtonsWrapper>
        </Styled.Form>
    );
};
