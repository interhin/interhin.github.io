$(document).ready(function(){
    new SwipeAnimate(150,1000);
});


class SwipeAnimate {
    constructor(size,speed) {
        this.size = size; // При каком смещении скроллиться к другому офферу
        this.speed = speed; // Скорость анимации
        this.addListener();
    }

    addListener() {
        const coords = [], offers = document.querySelectorAll(".offer"); // Получаем все офферы
        let speed = this.speed,size = this.size;
        // Формируем массив в котором будут координаты всех офферов относительно документа
        for (let offer of offers) {
            coords.push(offer.getBoundingClientRect().y+pageYOffset); // Координаты относительно окна + смещение (скролл) по оси Y
        }
        const settings = { // Объект с настройками
            curIndex: 0, // Текущий оффер
            isAnimating: false, //Флаг - происходит ли анимация
            speed,
            size,
            coords,
            offers
        }

        // Обработчик для скролла страницы (стрелочная функция чтобы сохранить контекст класса для вызова animateScroll)
        window.addEventListener("scroll",() => {
            if (pageYOffset>coords[settings.curIndex]+size && !settings.isAnimating) { // Если вышли 
                this.animateScroll(settings,1);
            }
            if (pageYOffset<coords[settings.curIndex]-size && !settings.isAnimating) {
                this.animateScroll(settings,-1);
            }
        });
    }

    animateScroll(settings,direction) { // direction - Направление скроллинга (-1 вверх, 1 вниз)
        settings.isAnimating = true; // Говорим что происходит анимация
        settings.curIndex+=direction; // Узнаем следующий оффер к которому пытается заскроллиться пользователь
        $('html, body').animate({ // Анимируем скроллинг
            scrollTop: settings.coords[settings.curIndex],
        }, settings.speed, function() {
            settings.isAnimating = false; // После окончания анимации меняем флаг
        });
    }
}