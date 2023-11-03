import styled from 'styled-components';

export const ConsultaPage = styled.div`
    padding: 2rem 4rem;
    width: 100%;
    box-sizing: border-box;
`

export const Title = styled.h2`
    color: #9A95B1;
    margin-bottom: 1rem;
`
export const Select = styled.input`
    display: flex;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 0.3rem;
    border: 1px solid ${({$color}) => {return $color === 'danger' ? '#BE2E2E' : '#159976'}};
    width: 100%;
    padding: .5rem;
    margin-bottom: 1rem;

    &:focus {
        background-color: #d2d0dc65;
        border: 1px solid ${({$color}) => {return $color === 'danger' ? '#BE2E2E' : '#159976'}};
    }
`