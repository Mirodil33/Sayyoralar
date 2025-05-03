from db import sayyoralar

def sayyoralar_ruyhati(sayyoralar):
    ruyhat = []
    for sayyora in sayyoralar:
        ruyhat.append(sayyora["sayyora_nomi"])
    return ruyhat


def sayyora_haqida(sayyoralar, sayyora_nomi):
    ruyhat = sayyoralar_ruyhati(sayyoralar)
    tanlov = ruyhat.index(sayyora_nomi.title())
    return sayyoralar[tanlov]

def yangi_sayyora_qushish(sayyoralar, sayyora_nomi, sayyora_joylashuvi, sayyora_haqida):
    sayyora = { "sayyora_nomi": sayyora_nomi.title(),
        "sayyora_joylashuvi": sayyora_joylashuvi,
        "sayyora_haqida": sayyora_haqida}
    sayyoralar.append(sayyora)
    return sayyoralar

def del_sayyora(sayyoralar, sayyora_id):
    info = sayyoralar.pop(int(sayyora_id))
    return info
    

# user_input = input("Sayyora nomini kiriting...:")
# info = sayyora_haqida(sayyoralar, user_input)
# print(info)
