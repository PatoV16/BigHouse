import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../../Models/Barthel.model.dart';
import '../../../Services/Barthel.service.dart';
import '../../../Widgets/submit_button.dart';

class BarthelForm extends StatefulWidget {
  final String idPaciente;

  const BarthelForm({Key? key, required this.idPaciente}) : super(key: key);

  @override
  _BarthelFormState createState() => _BarthelFormState();
}

class _BarthelFormState extends State<BarthelForm> {
  final BarthelService barthelService = BarthelService();
  final Map<String, int> valores = {
    'comer': 10,
    'traslado': 15,
    'aseo_personal': 5,
    'uso_retrete': 10,
    'banarse': 5,
    'desplazarse': 15,
    'subir_escaleras': 10,
    'vestirse': 10,
    'control_heces': 10,
    'control_orina': 10,
  };
  bool usaSillaRuedas = false;
  DateTime fechaEvaluacion = DateTime.now();

  int calcularPuntajeTotal() {
    int total = valores.values.reduce((a, b) => a + b);
    return usaSillaRuedas ? total.clamp(0, 90) : total;
  }

  void guardarBarthel() async {
    Barthel nuevaBarthel = Barthel(
      idPaciente: widget.idPaciente,
      comer: valores['comer']!,
      traslado: valores['traslado']!,
      aseoPersonal: valores['aseo_personal']!,
      usoRetrete: valores['uso_retrete']!,
      banarse: valores['banarse']!,
      desplazarse: valores['desplazarse']!,
      subirEscaleras: valores['subir_escaleras']!,
      vestirse: valores['vestirse']!,
      controlHeces: valores['control_heces']!,
      controlOrina: valores['control_orina']!,
      puntajeTotal: calcularPuntajeTotal(),
      fechaEvaluacion: fechaEvaluacion,
      observaciones: '',
    );

    await barthelService.addBarthel(nuevaBarthel);
    mostrarMensaje('Escala de Barthel guardada correctamente');
  }

  void mostrarMensaje(String mensaje) {
    showCupertinoDialog(
      context: context,
      builder: (context) => CupertinoAlertDialog(
        title: const Text("Información"),
        content: Text(mensaje),
        actions: [
          CupertinoDialogAction(
            child: const Text("OK"),
            onPressed: () => Navigator.pop(context),
          ),
        ],
      ),
    );
  }

  void seleccionarValor(String key, List<int> opciones) {
    showCupertinoModalPopup(
      context: context,
      builder: (context) => Container(
        height: 250,
        color: Colors.white,
        child: Column(
          children: [
            Expanded(
              child: CupertinoPicker(
                itemExtent: 40,
                onSelectedItemChanged: (index) {
                  setState(() {
                    valores[key] = opciones[index];
                  });
                },
                children: opciones.map((e) => Text(e.toString())).toList(),
              ),
            ),
            CupertinoButton(
              child: const Text("Aceptar"),
              onPressed: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: const Text('Registrar Escala de Barthel'),
        leading: CupertinoNavigationBarBackButton(
          onPressed: () => Navigator.pop(context),
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              for (var entry in valores.entries) ...[
                CupertinoButton(
                  child: Text("${entry.key.replaceAll('_', ' ').toUpperCase()}: ${entry.value}"),
                  onPressed: () => seleccionarValor(entry.key, [0, 5, 10, 15]),
                ),
              ],
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text("Usa silla de ruedas?"),
                  CupertinoSwitch(
                    value: usaSillaRuedas,
                    onChanged: (value) {
                      setState(() {
                        usaSillaRuedas = value;
                      });
                    },
                  ),
                ],
              ),
              const SizedBox(height: 20),
              Text("Puntaje Total: ${calcularPuntajeTotal()}", style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              const SizedBox(height: 20),
              SubmitButton(text: 'Guardar Barthel', onPressed: guardarBarthel),
            ],
          ),
        ),
      ),
    );
  }
}
