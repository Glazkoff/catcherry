<template>
  <div>
    <header>
      <div id="topbar">
        <nav class="navtopbar">
          <ul>
            <label for="gepleasurprised">
              <li class="icon right">
                <a v-on-clickaway="away">☰</a>
              </li>
            </label>

            <input
              type="checkbox"
              id="gepleasurprised"
              style="display: none;"
            />
            <li class="nav-logo">CATCHERRY</li>
            <li>
              <router-link :to="'/user/' + $route.params.id">{{ $t("accountMsg") }}</router-link>
            </li>
            <li>
              <router-link :to="'/user/' + $route.params.id + '/user_org'">{{
                $t("orgMsg")
              }}</router-link>
            </li>
            <li>
              <router-link :to="'/user/' + $route.params.id + '/list_req'">{{
                $t("applicationMsg")
              }}</router-link>
            </li>
            <li class="right">
              <button class="nav-exit">{{ $t("endMsg") }}</button>
            </li>
            <li class="right">
              <a class="nav-name"
                >{{ $t("hellouserMsg") }},<br />
                {{ $t("nameuserMsg") }}!</a
              >
            </li>
            <li class="right icon-notification">
              <div class = "notification">
  <a href = "#" class="nav-notification">
  <div class = "notBtn" href = "#">
    <!--Number supports double digets and automaticly hides itself when there is nothing between divs -->
    <div class = "number">2</div>
    <svg  class="fas" height="25pt" viewBox="-43 0 512 512" width="25pt" xmlns="http://www.w3.org/2000/svg"><path d="m413.417969 360.8125c-32.253907-27.265625-50.75-67.117188-50.75-109.335938v-59.476562c0-75.070312-55.765625-137.214844-128-147.625v-23.042969c0-11.796875-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.535156-21.332031 21.332031v23.042969c-72.257812 10.410156-128 72.554688-128 147.625v59.476562c0 42.21875-18.496094 82.070313-50.945312 109.503907-8.296876 7.105469-13.054688 17.429687-13.054688 28.351562 0 20.589844 16.746094 37.335938 37.332031 37.335938h352c20.589844 0 37.335938-16.746094 37.335938-37.335938 0-10.921875-4.757813-21.246093-13.25-28.519531zm0 0" fill="#ffffff" data-original="#000000" style="" class=""/><path d="m213.332031 512c38.636719 0 70.957031-27.542969 78.378907-64h-156.757813c7.425781 36.457031 39.746094 64 78.378906 64zm0 0" fill="#ffffff" data-original="#000000" style="" class=""/></svg>
      <div class = "box">
        <div class = "display">
          <div class = "nothing"> 
            <div class = "cent">Looks Like your all caught up!</div>
          </div>
          <div class = "cont">
            <!-- Fold this div and try deleting evrything inbetween -->
             <div class = "sec new">
               <a href = "https://codepen.io/Golez/">
               <div class = "profCont">
               <img class = "profile" src = "https://c1.staticflickr.com/5/4007/4626436851_5629a97f30_b.jpg">
                </div>
               <div class = "txt">James liked your post: "Pure css notification box"</div>
              <div class = "txt sub">11/7 - 2:30 pm</div>
               </a>
            </div>
             <div class = "sec new">
               <a href = "https://codepen.io/Golez/">
               <div class = "profCont">
               <img class = "profile" src = "https://obamawhitehouse.archives.gov/sites/obamawhitehouse.archives.gov/files/styles/person_medium_photo/public/person-photo/amanda_lucidon22.jpg?itok=JFPi8OFJ">
                </div>
               <div class = "txt">Annita liked your post: "Pure css notification box"</div>
              <div class = "txt sub">11/7 - 2:13 pm</div>
               </a>
            </div>
             <div class = "sec">
               <a href = "https://codepen.io/Golez/">
               <div class = "profCont">
               <img class = "profile" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3O45RK9qyCrZJivYsY6PmeVEJH07l7bkoolJmscBsNjzump27">
                </div>
               <div class = "txt">Brie liked your post: "Pure css notification box"</div>
              <div class = "txt sub">11/6 - 9:35 pm</div>
               </a>
            </div>
             <div class = "sec">
               <a href = "https://codepen.io/Golez/">
               <div class = "profCont">
               <img class = "profile" src = "https://c1.staticflickr.com/4/3725/10214643804_75c0b6eeab_b.jpg">
                </div>
               <div class = "txt">Madison liked your post: "Pure css notification box"</div>
              <div class = "txt sub">11/6 - 4:04 pm</div>
               </a>
            </div>
             <div class = "sec">
               <a href = "https://codepen.io/Golez/">
               <div class = "profCont">
               <img class = "profile" src="https://upload.wikimedia.org/wikipedia/commons/5/52/NG_headshot_white_shirt_square_Jan18.jpg">
                </div>
               <div class = "txt">Ted liked your post: "Pure css notification box"</div>
              <div class = "txt sub">11/6 - 10:37 am</div>
               </a>
            </div>
             <div class = "sec">
               <a href = "https://codepen.io/Golez/">
               <div class = "profCont">
               <img class = "profile" src = "https://upload.wikimedia.org/wikipedia/commons/d/dd/Pat-headshot-square.jpg">
                </div>
               <div class = "txt">Tommas liked your post: "Pure css notification box"</div>
              <div class = "txt sub">11/5 - 7:30 pm</div>
               </a>
            </div>
             <div class = "sec">
               <a href = "https://codepen.io/Golez/">
               <div class = "profCont">
               <img class = "profile" src = "https://c1.staticflickr.com/8/7407/13785133614_6254abb8c4.jpg">
                </div>
               <div class = "txt">Claire liked your post: "Pure css notification box"</div>
              <div class = "txt sub">11/5 - 2:30 pm</div>
               </a>
            </div>
             <div class = "sec">
               <a href = "https://codepen.io/Golez/">
               <div class = "profCont">
               <img class = "profile" src = "//c1.staticflickr.com/1/185/440890151_54c5b920b0_b.jpg">
                </div>
               <div class = "txt">Jerimaiah liked your post: "Pure css notification box"</div>
              <div class = "txt sub">11/5 - 1:34 pm</div>
               </a>
            </div>
             <div class = "sec">
               <a href = "https://codepen.io/Golez/">
               <div class = "profCont">
               <img class = "profile" src = "//c2.staticflickr.com/4/3397/3585544855_28442029a5_z.jpg?zz=1">
                </div>
               <div class = "txt">Debra liked your post: "Pure css notification box"</div>
              <div class = "txt sub">11/5 - 10:20 am</div>
               </a>
            </div>
         </div>
        </div>
     </div>
  </div>
    </a>
</div>
            </li>
            <li class="right">
              <a class="nav-point"
                >52 {{ $t("pointsMsg") }} </a
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway";

export default {
  name: "top-bar",
  directives: {
    onClickaway: onClickaway,
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
    away: function() {
      console.log("clicked away");
    },
  },
};
</script>

<style lang="scss" scoped>
#topbar,
#comptacagatin,
#luepgoposion {
  width: 100%;
}

#topbar ul {
  list-style-type: none;
}

#topbar ul li {
  float: left;
  transition: 0.7s;
  moz-transition: 0.7s;
  o-transition: 0.7s;
  webkit-transition: 0.7s;
}

#topbar ul .right {
  float: right;
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
  color: #ffffff;
  cursor: pointer;
}

.icon {
  display: none;
  font-size: 0.95em;
}

header {
  width: 100%;
  background: #8c030e;
  min-height: 2em;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 60px;
}

.nav-exit {
  border: none;
  outline: none;
  background: white;
  color: #8c030e;
  font-weight: bold;
  margin-left: 2rem;
  margin-right: 2rem;
  padding: 0.5rem 2rem;
  border-radius: 4px;
  font-size: 16px;
  display: block;
  cursor: pointer;
}
.nav-logo {
  text-align: left;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  color: #ffffff;
  padding-right: 30px;
}
#topbar ul li .nav-name {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
}
#topbar ul li .nav-point {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
}
.icon-notification{
  display: inline;
  float: right;
}
.box::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
  border-radius: 5px
}

.box::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
  border-radius: 5px
}

.box::-webkit-scrollbar-thumb
{
	background-color: black;
	border: 2px solid black;
  border-radius: 5px
}
.notification{
  position: relative;
  display: inline-block;
  
}

.number{
  height: 22px;
  width:  22px;
  background-color: #FFC700;
  border-radius: 20px;
  color: black;
  text-align: center;
  position: absolute;
  top: 5px;
  left: 60px;
  border-style: solid;
  border-width: 2px;
}

.number:empty {
   display: none;
}

.notBtn{
  transition: 0.5s;
  cursor: pointer
}

.fas{
  font-size: 25pt;
  color: white;
  margin-right: 40px;
  margin-left: 40px;
}

.box{
  width: 400px;
  height: 0px;
  border-radius: 10px;
  transition: 0.5s;
  position: absolute;
  overflow-y: scroll;
  padding: 0px;
  left: -300px;
  margin-top: 5px;
  background-color: #F4F4F4;
  -webkit-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
  box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
  cursor: context-menu;
}

.fas:hover {
  color: #F4F4F4;
}

.notBtn:hover > .box{
  height: 60vh
}

.content{
  padding: 20px;
  color: black;
  vertical-align: middle;
  text-align: left;
}

.gry{
  background-color: #F4F4F4;
}

.top{
  color: black;
  padding: 10px
}

.display{
  position: relative;
}

.cont{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #F4F4F4;
}

.cont:empty{
  display: none;
}

.stick{
  text-align: center;  
  display: block;
  font-size: 50pt;
  padding-top: 70px;
  padding-left: 80px
}

.stick:hover{
  color: black;
}

.cent{
  text-align: center;
  display: block;
}

.sec{
  padding: 25px 10px;
  background-color: #F4F4F4;
  transition: 0.5s;
}

.profCont{
  padding-left: 15px;
}

.profile{
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
  width: 75px;
  float: left;
}

.txt{
  color: black;
  vertical-align: top;
  font-size: 1.25rem;
  padding: 5px 10px 0px 115px;
}

.sub{
  font-size: 1rem;
  color: grey;
}

.new{
  border-style: none none solid none;
  border-color: #8c030e;
}

.sec:hover{
  background-color: #BFBFBF;
}
@media screen and (max-width: 1090px) {
  nav ul li:not(:nth-child(1)) {
    display: none;
  }
  nav ul .nav-logo {
    display: inline-block !important;
  }
  nav ul li.icon {
    display: inline-block;
  }
  label {
    cursor: pointer;
  }
  #gepleasurprised:checked ~ li {
    float: none;
    display: block;
  }
  .nav-exit {
    margin-left: 0.8em;
  }
  #gepleasurprised:checked ~ li a.nav-name {
    display: none;
  }
}
@media screen and (max-width: 350px) {
  .nav-logo {
    font-size: 24px;
  }
}
</style>
