import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ProntuarioService } from "../../services/Prontuarios.service";

const Autocomplete = ({ id, placeholder, onChange }) => {
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {

        const fetchPacientes = async () => {
            try {
                const data = await ProntuarioService.buscarProntuarios(inputValue);
                const options = data.map((value) => ({
                    id: value.pac_id,
                    label: value.pac_nome,
                }));
                setOptions(options);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPacientes();
    }, [inputValue]);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleOnChange = (values) => {
        if(values && values.length > 0){
            onChange(values[0]);
        }
    }

    return (
        <Typeahead
            id={id}
            options={options}
            labelKey="label"
            placeholder={placeholder}
            aria-label={placeholder}
            onChange={handleOnChange}
            onInputChange={handleInputChange}
        />
    );
};

export default Autocomplete;
