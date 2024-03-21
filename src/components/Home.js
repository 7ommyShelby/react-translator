import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './home.css'


const Home = () => {

    const [lang, setLang] = useState("");
    const [srclang, setSrclang] = useState([]);
    const [tarlang, setTarlang] = useState([]);
    const [res, setRes] = useState("");

    const [srccodes, setsrcCodes] = useState('');
    const [tarcodes, settarCodes] = useState('');

    async function translate() {
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', srccodes);
        encodedParams.set('target_language', tarcodes);
        encodedParams.set('text', lang);

        const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'ef75754912msh197e010aa946b76p182927jsn3ffdd832791c',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setRes(response.data.data.translatedText);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function getLang() {
            const options = {
                method: 'GET',
                url: 'https://text-translator2.p.rapidapi.com/getLanguages',
                headers: {
                    'X-RapidAPI-Key': 'ef75754912msh197e010aa946b76p182927jsn3ffdd832791c',
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                // console.log(response.data.data.languages);

                setSrclang(response.data.data.languages)
                setTarlang(response.data.data.languages)
            } catch (error) {
                console.error(error);
            }
        }
        getLang()
    }, [])


    return (
        <>
        <h1>Ez Pz Translator</h1>
            <div className='ins'>

                <select name="" id="" onChange={(e)=>{
                    setsrcCodes(e.target.value)
                }}>
                    <option value="">Select Language</option>
                    {
                        srclang.map((e,idx) => {
                            return (
                                <option key={idx} value={e.code}>{e.name}</option>
                            )
                        })
                    }
                </select>

                <select name="" id="" onClick={(e)=>{
                    settarCodes(e.target.value)
                }}>
                    <option value="">Select Language</option>
                    {
                        tarlang.map((e, idx) => {
                            return (
                                <option key={idx} value={e.code}>{e.name}</option>
                            )
                        })
                    }
                </select>

                <input type="text" name="" id="" placeholder='enter text' value={lang}
                    onChange={(e) => {
                        return setLang(e.target.value)
                    }} />
                <button onClick={() => {
                    translate()
                }}>Translate</button>
            </div>

            <div className="display">
                {res}
            </div>
        </>
    )
}

export default Home
