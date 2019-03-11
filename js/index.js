$(document).ready(function(){
    //new SwipeAnimate(50,500);
    $('.offers-container').fullpage({scrollingSpeed:500});
});


class SwipeAnimate {
    constructor(size,speed) {
        this.size = size; // При каком смещении скроллиться к другому офферу
        this.speed = speed; // Скорость анимации
        this.coords = []; // Координаты офферов (отступы по оси Y от документа)
        this.offers = null; // Список офферов
        this.curIndex = 0; // Текущий оффер
        this.isAnimating = false; // Флаг - происходит ли анимация
        this.loadOffers(); // Загрузка офферов
        this.loadCoords(); // Загрузка координат офферов
        this.loadCurIndex(); // Определение текущего индекса
        this.addScrollListener(); // Подписка на событие скролла
        this.addOrientationChange(); // Подписка на событие смены ориентации смартфона
    }

    addScrollListener() {
        // Обработчик для скролла страницы (стрелочная функция чтобы сохранить контекст класса для вызова animateScroll)
        window.addEventListener("scroll",() => {
            //console.log(this.coords[this.curIndex],document.querySelector("html").scrollTop);
            // Если при скролле отступ сверху больше чем координата Y оффера + указанное смещение и не происходит анимация
            // то анимируем скролл вниз к следующему офферу
            if (pageYOffset>this.coords[this.curIndex]+this.size && !this.isAnimating) {
                this.animateScroll(1);
            }
            // Иначе скролл вверху к предыдущему офферу
            if (pageYOffset<this.coords[this.curIndex]-this.size && !this.isAnimating) {
                this.animateScroll(-1);
            }
        });
    }

    animateScroll(direction) { // direction - Направление скроллинга (-1 вверх, 1 вниз)
        this.isAnimating = true; // Говорим что происходит анимация
        this.curIndex +=direction; // Узнаем следующий оффер к которому пытается заскроллиться пользователь
        $('html, body').animate({ // Анимируем скроллинг
            scrollTop: this.coords[this.curIndex],
        }, this.speed, () => { // Сохраняем контекст объекта стрелочной функцией
            this.isAnimating = false; // После окончания анимации меняем флаг
        });
    }

    loadCoords() {
        // Формируем массив в котором будут координаты всех офферов относительно документа
        for (let offer of this.offers) {
            this.coords.push(offer.getBoundingClientRect().y+pageYOffset); // Координаты относительно окна + смещение (скролл) по оси Y
        }
    }

    loadOffers() {
        this.offers = document.querySelectorAll(".offer");
    }

    addOrientationChange() {
        window.addEventListener("orientationchange", () => {
            // this.scrollToBegin(); // Если ориентация поменялась то скроллим в начало.
            // orientationchange срабатывает до смены ориентации поэтому делаем велосипед черезе промис чтобы отследить окончание изменения ориентации
            this.isAnimating = true; // Говорим что началась анимация (фейковая) чтобы не тригерились события при смене координат
            this.orientationChanged().then(()=>{
                this.coords = []; // Очищаем предыдущие координаты
                this.loadCoords(); // Обновляем координаты после смены ориентации
                this.isAnimating = false; // Заканчиваем "фековую" анимацию
            });
        });
    }

    orientationChanged() {
        const timeout = 120; // Макс кол-во вызовов функций
        return new Promise(function(resolve) {
          const go = (i, height0) => {
            // Крайний случай рекурсии
            window.innerHeight != height0 || i >= timeout ? // window.innerHeight текущий размер окна браузера
              // Если предыдущая высота height0 не равна текущей, т.е. ориентация изменилась или наступил таймаут
              // то говорим что обещание выполнено и следующий обработчик через then будет выполнен
              resolve() :
              window.requestAnimationFrame(() => go(i + 1, height0)); // Иначе увеличиваем i и продолжаем рекурсию
              // requestAnimationFrame - функция которая вызывает колбек когда браузер это посчитает нужным (чтобы не мешать другим отрисовкам)
          };
          go(0, window.innerHeight); // Начинаем рекурсию
        });
    }

    scrollToBegin() {
        this.curIndex = 0;
        this.animateScroll(0);
    }

    loadCurIndex() {
        for (let i = 0; i < this.coords.length; i++) {
            // Очень страшные формулы подобрал методом тыка
            let rightSide = this.coords[i]+this.offers[0].offsetHeight+ +this.offers[0].style.marginBottom-this.size;
            let leftSide = this.coords[i]-this.size;
            if (pageYOffset>leftSide && pageYOffset<rightSide) {
                this.curIndex = i;
                break;
            }
        }
    }

}