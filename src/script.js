API_URL_WORDPRESS = '';
async function getTextFromAdmin() {
    await axios.get(API_URL_WORDPRESS).then((response) => {
        return response.data;
    }).catch((error) => {
            console.log(error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const data = getTextFromAdmin();

    const accordions = document.querySelectorAll('.accordion');

    const title = document.querySelector('.description__title');
    const text = document.querySelector('.description__text');

    if(data.title === undefined) {
        title.textContent = 'На что рассчитывать при взыскании неустойки по ДДУ?';
    } else {
        title.textContent = data.title;
    }

    if(data.text === undefined) {
        text.textContent = 'Когда застройщик нарушает сроки сдачи поДДУ, вы как дольщик\n' +
            'имеете право требовать неустойку за просрочку, а также\n' +
            'компенсацию убытков, вызванных этой просрочкой.\n' +
            '\n' +
            'Само собой, застройщику невыгодно добровольно\n' +
            'выплачивать вам компенсацию. Когда дело доходит до суда,\n' +
            'суд урезает сумму неустойки на основании ст. 333 ГК РФ.\n' +
            'Это урезание практически неизбежно.\n' +
            '\n' +
            'Основная наша задача состоит в том, чтобы взыскать\n' +
            'неустойку по ДДУ в максимальном размере, т.е. избежать\n' +
            'сильного ее урезания. Вот что вы можете требовать от\n' +
            'застройщика.';
    } else {
        text.textContent = data.text;
    }


    accordions.forEach(button => {
        button.addEventListener('click', (e) => {
            const self = e.currentTarget;

            const control = self.querySelector('.accordion__control');
            const icon = self.querySelector('.accordion__buttonIcon');
            const content = self.querySelector('.accordion__content');

            icon.classList.toggle('accordion__iconIsActive')
            content.classList.toggle('accordion__contentIsActive');

            if (content.classList.contains('accordion__contentIsActive')) {
                control.setAttribute('aria-expanded', true);
                content.setAttribute('aria-hidden', false);
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                control.setAttribute('aria-expanded', false);
                content.setAttribute('aria-hidden', true);
                content.style.maxHeight = null;
            }
        });
    });
});