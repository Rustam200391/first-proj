'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

type Dictionary = {
  [key: string]: {
    russian: string;
    azerbaijani: string;
  }[];
};

export default function DictionaryApp() {
  const [time, setTime] = useState<string | null>(null); // null чтобы избежать несоответствия
  const [bgColor, setBgColor] = useState('#ffffff');
  const [activeCategory, setActiveCategory] = useState<string>('приветствия');

  const dictionary: Dictionary = {
    'приветствия': [
      { russian: 'Здравствуйте', azerbaijani: 'Salam' },
      { russian: 'Доброе утро', azerbaijani: 'Sabahınız xeyir' },
      { russian: 'Добрый день', azerbaijani: 'Günortanız xeyir' },
      { russian: 'Добрый вечер', azerbaijani: 'Axşamınız xeyir' },
      { russian: 'Как дела?', azerbaijani: 'Necəsiniz?' },
    ],
    'общение': [
      { russian: 'Да', azerbaijani: 'Bəli' },
      { russian: 'Нет', azerbaijani: 'Xeyr' },
      { russian: 'Спасибо', azerbaijani: 'Təşəkkür edirəm' },
      { russian: 'Пожалуйста', azerbaijani: 'Zəhmət olmasa' },
      { russian: 'Извините', azerbaijani: 'Bağışlayın' },
    ],
    'еда': [
      { russian: 'Вода', azerbaijani: 'Su' },
      { russian: 'Хлеб', azerbaijani: 'Çörək' },
      { russian: 'Мясо', azerbaijani: 'Ət' },
      { russian: 'Рыба', azerbaijani: 'Balıq' },
      { russian: 'Овощи', azerbaijani: 'Tərəvəz' },
    ]
  };

  useEffect(() => {
    // Устанавливаем текущее время после загрузки клиента
    setTime(new Date().toLocaleTimeString());

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const changeColor = () => {
    const colors = ['#f0fff0', '#f0f8ff', '#fff0f5', '#f5f5f0'];
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const currentCategory = dictionary[activeCategory] || [];

  return (
    <main className={styles.main} style={{ backgroundColor: bgColor }}>
      <div className={styles.container}>
        <div className={styles.headerDecor}>
          <img src="/images/hat.png" alt="Кавказская папаха"  className={styles.hat} />
          <h1>Русско-азербайджанский разговорник</h1>
          <img src="/images/shashlik.gif" alt="Шашлык на шампуре" className={styles.shashlik} />
        </div>

        {/* Отображаем только после рендера на клиенте */}
        {time && <p>Текущее время: {time}</p>}

        <div className={styles.buttons}>
          {Object.keys(dictionary).map(category => (
            <button
              key={category}
              className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.dictionary}>
          {currentCategory.map((item, index) => (
            <div key={index} className={styles.wordCard}>
              <div className={styles.language}>🇷🇺 {item.russian}</div>
              <div className={styles.language}>🇦🇿 {item.azerbaijani}</div>
            </div>
          ))}
        </div>

        <button className={styles.colorButton} onClick={changeColor}>
          Сменить цвет фона
        </button>
      </div>
    </main>
  );
}
