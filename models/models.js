const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')
// Подключение библтотек


// Описание моделей
const User = sequelize.define('user', { // Пользователь
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    aftername: {type: DataTypes.STRING, allowNull: true},
    classNum: {type: DataTypes.STRING, allowNull: true},
    git: {type: DataTypes.STRING, allowNull: true},
    phoneNum: {type: DataTypes.STRING, allowNull: true},
    role: {type: DataTypes.STRING, allowNull: false}
})

const UserAvatar = sequelize.define('avatar', {
    img: {type: DataTypes.STRING, allowNull: false}
})

const UserApp = sequelize.define('user-app', { // Перечень заявок
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    AdverstId: {type: DataTypes.INTEGER, allowNull: false}
})

const UserFeedback = sequelize.define('user-feedback', { // Перечень откликов
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    AdverstId: {type: DataTypes.INTEGER, allowNull: false}
})

const UserPortfolio = sequelize.define('portfolio', { // Портофолио
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const PortfolioWork = sequelize.define('portfolio-work', { // Работа в портфолио
    img: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false}
})

const UserResume = sequelize.define('user-resume', { // Резюме
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Resume_Info = sequelize.define('resume-info', { // Инфо поле в резюме
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const UserAd = sequelize.define('user-advertisement', { // Объявление
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    type: {type: DataTypes.STRING, defaultValue: "ADVERST"}
})

const UserAd_Info = sequelize.define('user-advertisement-info', { // Инфо поле объявления
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const UserAd_Img = sequelize.define('user-advertisement-img', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Advertisements = sequelize.define('all-advertisement', {
}) // Все объяыления

const Rating = sequelize.define('rating', { // Отзыв-оценка
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
})

User.hasOne(UserAvatar)
UserAvatar.belongsTo(User)

User.hasMany(UserAd)
UserAd.belongsTo(User)


User.hasOne(UserResume) // Один пользователь иммет одно резюме
UserResume.belongsTo(User) // Резюме принадлежит пользователю


UserResume.hasMany(Resume_Info, {as: 'resume_info'}) // Одно резюме имеет много инфо полей
Resume_Info.belongsTo(UserResume) // Инфо поле принадлежит к одному резюме


User.hasOne(UserPortfolio) // Один рользователь имеет одно портфолио
UserPortfolio.belongsTo(User) // Портфолил принадлежит пользователю


UserPortfolio.hasMany(PortfolioWork) // Одно портфолио имеет много работ
PortfolioWork.belongsTo(UserPortfolio, {as: 'work'}) // Работа принадлежит портфолио


User.hasMany(UserApp) // Один пользователь имеет один перечень заявок
UserApp.belongsTo(User) // Перечень заявок принадлежит одному пользователю


User.hasMany(UserFeedback) // Один пользователь имеет один перечень откликов
UserFeedback.belongsTo(User) // Перечень откликов принадлежит одному пользователю


UserAd.hasMany(UserAd_Info, {as: 'adverst_info'}) // Одно объявление имеет много инфо полей
UserAd_Info.belongsTo(UserAd) // Инфо поле принадлежит к одному объявлению

UserAd.hasOne(UserAd_Img, {as: 'adverst_img'}) // Одно объявление имеет одну картинку
UserAd_Img.belongsTo(UserAd) // Одно к одному

UserAd.hasMany(Rating) // Одно объявлени имеет много рейтингов
Rating.belongsTo(UserAd) // Рейтинг принадлежит объявлению


module.exports = {
    User, UserFeedback, UserApp, UserAd, UserPortfolio,
    UserResume, Rating, Resume_Info, PortfolioWork,
    UserAd_Info, Advertisements, UserAvatar, UserAd_Img
}


