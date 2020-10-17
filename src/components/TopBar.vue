<template>
    <div>
<header><div id="topbar">
  <nav class="navtopbar">

  <ul>
  <label for="gepleasurprised">
  
  <li class="icon right">
  <a>☰</a>
  </li>
  </label>
  
  <input type="checkbox" id="gepleasurprised" style="display: none;" />
  <li class="nav-logo">CATCHERRY</li>
  <li><a href="#">Главная</a></li>
  <li><a href="#">Личный кабинет</a></li>
  <li><a href="#">Команда</a></li>
  <li class="right"><button class="nav-exit">Выйти</button></li>
  <li class="right "> <a class="nav-name">Здравствуйте,<br> Евлампий Крестовоздвиженский!</a></li>
  </ul>
  </nav>
  </div></header>
    </div>
</template>

<script>
    export default {
        name: "top-bar"
    }
</script>

<style lang="scss" scoped>
#topbar, #comptacagatin, #luepgoposion {
  width: 100%;
}

#topbar ul {
  list-style-type: none;

}

#topbar ul li {
  float : left;
  transition: 0.7s;
  moz-transition: 0.7s;
  o-transition: 0.7s;
  webkit-transition: 0.7s;
}

#topbar ul .right {
  float : right;
}  

#topbar ul li a {
  display: inline-block;
  padding: 0.8em;
  text-decoration: none;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: #FFFFFF;
    cursor: pointer;
}

.icon {
  display: none;
  font-size: 0.95em;
}


header{
    width: 100%;
    background: #8C030E;
  min-height: 2em;
    justify-content: center;
     padding-top: 20px;
    padding-bottom: 60px;
   
 }

.nav-exit{
    border: none; 
    outline: none;
    background: white;
    color: #8C030E;
    font-weight: bold;
    margin-left: 2rem;
    margin-right: 2rem;
    padding: 0.5rem 2rem;
    border-radius: 4px;
    font-size: 16px;
    display: block;
    cursor: pointer;
}
.nav-logo{
text-align: left;
font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 44px;
color: #FFFFFF;
padding-right: 30px;
}
#topbar ul li .nav-name{
font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 15px;
color: #FFFFFF;
}
@media screen and (max-width: 1090px){
  nav ul li:not(:nth-child(1)) {display: none;}
  nav ul .nav-logo {display:  inline-block !important;}
  nav ul li.icon {display: inline-block;}
  label { cursor: pointer;}
  #gepleasurprised:checked ~ li { float: none; display: block;}
  .nav-exit {margin-left: 0.8em;}
  #gepleasurprised:checked ~ li a.nav-name {display: none;}
}
@media screen and (max-width: 350px){
  .nav-logo {font-size: 24px;}

}
</style>