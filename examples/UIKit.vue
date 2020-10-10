<template>
  <div>
    <h1>Первичный UI-kit</h1>
    <div class="all">
        <section id="button">
            <div class="components">
                <h2>1. Кнопки</h2>
                <div class="btn-group">
                    <button class="btn btn-primary">Primary</button>
                    <button class="btn btn-secondary">Secondary</button>
                    <button class="btn btn-danger">Danger</button>
                    <button class="btn btn-link">Link</button>
                    <button class="btn btn-primary" disabled>Disabled</button>
                </div>
                <button class="btn small btn-primary">Кнопка маленькая</button>
                <br>
                <button class="btn large btn-danger">Кнопка большая</button>
                <br>
                <button class="btn btn-block btn-primary">Кнопка block</button>
            </div>
            <div class="code">
                <p><code data-lang="html">
                    &lt;button class="<span class="class">btn btn-primary</span>">Primary&lt;/button><br>
                    &lt;button class="<span class="class">btn btn-secondary</span>">Secondary&lt;/button><br>
                    &lt;button class="<span class="class">btn btn-danger</span>">Danger&lt;/button><br>
                    &lt;button class="<span class="class">btn btn-link</span>">Link&lt;/button><br>
                    &lt;button class="<span class="class">btn btn-primary</span>" disabled>Disabled&lt;/button><br>
                    &lt;button class="<span class="class">btn small btn-primary</span>">Кнопка маленькая&lt;/button><br>
                    &lt;button class="<span class="class">btn large btn-danger</span>">Кнопка большая&lt;/button><br>
                    &lt;button class="<span class="class">btn btn-block btn-primary</span>">Кнопка block&lt;/button>
                </code></p>
            </div>
            <div class="components">
                <h2>3. Всплывающие окна</h2>
                <button class="btn btn-primary" onclick="openModal()">Нажмите для появления модального окна</button>
            </div>
            <div class="code">
                <p><code>
                    &lt;div id="dark-display" onclick="closeModal()">&lt;/div><br>
                    &lt;div id="modal"><br>
                        &lt;div class="<span class="class">modal-title</span>"><br>
                            Заголовок модального окна<br>
                        &lt;/div><br>
                        &lt;span onclick="closeModal()">&times;&lt;/span><br>
                        &lt;div class="<span class="class">modal-body</span>"><br>
                            Текст модального окна<br>
                        &lt;/div><br>
                    &lt;/div>
                </code></p>
            </div>
            <div class="components">
                <h2>4. Маленькие всплывающие окна</h2>
                <button class="btn btn-primary" onclick="openMiniModal()">Нажмите для появления маленького модального окна</button>
            </div>
            <div class="code">
                <p><code>
                     &lt;div id="mini-modal"><br>
                         &lt;div class="<span class="class">mini-modal-title</span>">
                            Текст маленького модального окна
                         &lt;/div><br>
                         &lt;span onclick="closeMiniModal()">&times; &lt;/span><br>
                         &lt;div class="<span class="class">mini-modal-body</span>"><br>
                             &lt;div class="<span class="class">modal-done</span>">&check; &lt;/div><br>
                             &lt;div class="<span class="class">modal-error</span>">&times; &lt;/div><br>
                         &lt;/div><br>
                     &lt;/div>
                </code></p>
            </div>
        </section>
        
        <br>

        <section id="input">
            <div class="components">
                <h2>2. Формы</h2>
                <div class="form-group">
                    <lable for="text" class="form-name small">Email address</lable>
                    <input class="form-control small" type="text" id="text" placeholder="Пример">
                    <p class="form-text small">We'll never share your email with anyone else.</p>
                </div>
                <div class="form-group">
                    <lable for="text" class="form-name">Email address</lable>
                    <input class="form-control" type="text" id="text" placeholder="Пример">
                    <p class="form-text">We'll never share your email with anyone else.</p>
                </div>
                <div class="form-group">
                    <lable for="text" class="form-name large">Email address</lable>
                    <input class="form-control large" type="text" id="text" placeholder="Пример">
                    <p class="form-text large">We'll never share your email with anyone else.</p>
                </div>
                <div class="form-group">
                    <lable for="text" class="form-name">Email address</lable>
                    <textarea class="form-control" id="text" placeholder="Пример"></textarea>
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input">
                    <label>Check me out</label>
                </div>
                <div class="form-group">
                    <lable class="form-name">Example file input</lable>
                    <input type="file" class="form-control-file">
                </div>
            </div>
            <div class="code">
                <p><code>
                    &lt;div class="<span class="class">form-group</span>"><br>
                    &lt;lable for="text" class="<span class="class">form-name small</span>">Email address&lt;/lable><br>
                    &lt;input class="<span class="class">form-control small</span>" type="text" id="text" placeholder="Пример"><br>
                    &lt;p class="<span class="class">form-text small</span>">We'll never share your email with anyone else.&lt;/p><br>
                &lt;/div><br>
                &lt;div class="<span class="class">form-group</span>"><br>
                    &lt;lable for="text" class="<span class="class">form-name</span>">Email address&lt;/lable><br>
                    &lt;input class="<span class="class">form-control</span>" type="text" id="text" placeholder="Пример"><br>
                    &lt;p class="<span class="class">form-text</span>">We'll never share your email with anyone else.&lt;/p><br>
                &lt;/div><br>
                &lt;div class="<span class="class">form-group</span>"><br>
                    &lt;lable for="text" class="<span class="class">form-name large</span>">Email address&lt;/lable><br>
                    &lt;input class="<span class="class">form-control large</span>" type="text" id="text" placeholder="Пример"><br>
                    &lt;p class="<span class="class">form-text large</span>">We'll never share your email with anyone else.&lt;/p><br>
                &lt;/div><br>
                &lt;div class="<span class="class">form-group</span>"><br>
                    &lt;lable for="text" class="<span class="class">form-name</span>">Email address&lt;/lable><br>
                    &lt;textarea class="<span class="class">form-control</span>" id="text" placeholder="Пример">&lt;/textarea><br>
                &lt;/div><br>
                &lt;div class="<span class="class">form-group form-check</span>"><br>
                    &lt;input type="checkbox" class="<span class="class">form-check-input</span>"><br>
                    &lt;label>Check me out&lt;/label><br>
                &lt;/div><br>
                &lt;div class="<span class="class">form-group</span>"><br>
                    &lt;lable class="<span class="class">form-name</span>">Example file input&lt;/lable><br>
                    &lt;input type="file" class="<span class="class">form-control-file</span>"><br>
                &lt;/div>
                </code></p>
            </div>
        </section>
    </div>
    
    <br>
    <br>
        
        <div id="dark-display" onclick="closeModal()"></div>
        <div id="modal">
            <div class="modal-title">
                Заголовок модального окна
            </div>
            <span onclick="closeModal()">&times;</span>
            <div class="modal-body">
                Текст модального окна
            </div>
        </div>

        <div id="mini-modal">
            <div class="mini-modal-title">
                Текст маленького модального окна
            </div>
            <span onclick="closeMiniModal()">&times;</span>
            <div class="mini-modal-body">
                <div class="modal-done">&check;</div>
                <div class="modal-error">&times;</div>
            </div>
        </div>
  </div>
</template>

<script>

</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.all {
  display: flex;
  justify-content: space-between;
}

.class {
  color: #dc3545;
}

.code {
  font-size: 1.2rem;
}

section {
  border: 5px solid #f7f7f9;
}

.components {
  padding: 2%;
  background: white;
}

.code {
  padding: 2%;
}

#button, #input {
  width: 48%;
  background: #f7f7f9;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 0.5rem;
}

.btn-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

br {
  margin-bottom: 0.5rem;
}
</style>
