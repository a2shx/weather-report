function LangButton(props) {
    const { lang, handleLangChange } = props;
    return(
        <button className='text-white text-sm font-bold bg-black bg-opacity-40 px-4 py-1 mb-3 rounded-md relative' onClick={handleLangChange}>
            {lang === 'en'? 'TH':'EN'}
        </button>
    )
}
export default LangButton;