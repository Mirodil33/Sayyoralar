from flask import Flask, render_template, request, redirect, url_for
from functions import *
from db import sayyoralar

app = Flask(__name__)

@app.route("/")
def index():
    sayyoralar_ = sayyoralar_ruyhati(sayyoralar)
    return render_template("index.html", sayyoralar=sayyoralar_)
@app.route("/sayyora/<sayyora>")
def sayyora_info(sayyora):
    info = sayyora_haqida(sayyoralar, sayyora)
    return render_template("sayyora.html", info=info)


@app.route("/yangi_sayyora", methods=["GET", "POST"])
def yangi_sayyora():
    if request.method == "POST":
        sayyora_nomi = request.form.get("sayyora_nomi")
        sayyora_joylashuvi = request.form.get("sayyora_joylashuvi")
        sayyora_haqida = request.form.get("sayyora_haqida")

        yangi_sayyora_qushish(sayyoralar, sayyora_nomi, sayyora_joylashuvi, sayyora_haqida)
        
        

    return render_template("yangi_sayyora.html")

@app.route("/sayyora_ochirish/<sayyora_id>")
def sayyora_ochirish(sayyora_id):
    sayyora_id = int(sayyora_id)-1
    info = del_sayyora(sayyoralar, sayyora_id)
    return redirect(url_for("index"))

app.run(debug=True)