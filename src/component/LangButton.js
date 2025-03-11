function LangButton(props) {
    const { lang, handleLangChange } = props;
    return(
        <button onClick={handleLangChange}>
            {lang === 'en'? 'TH':'EN'}
        </button>
    )
}
export default LangButton;