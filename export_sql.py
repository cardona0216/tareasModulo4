import sqlite3

def export_sql(db_file, output_file):
    conn = sqlite3.connect(db_file)
    with open(output_file, 'w') as f:
        for line in conn.iterdump():
            f.write(f'{line}\n')
    conn.close()

if __name__ == '__main__':
    export_sql('db.sqlite3', 'esquema.sql')
