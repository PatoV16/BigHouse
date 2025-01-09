import 'package:flutter/cupertino.dart';

class RegistroNovedadForm extends StatefulWidget {
  const RegistroNovedadForm({super.key});

  @override
  State<RegistroNovedadForm> createState() => _RegistroNovedadFormState();
}

class _RegistroNovedadFormState extends State<RegistroNovedadForm> {
  final _formKey = GlobalKey<FormState>();
  
  // Controladores para los campos del formulario
  final TextEditingController _pacienteController = TextEditingController();
  final TextEditingController _turnoController = TextEditingController();
  final TextEditingController _novedadesController = TextEditingController();
  final TextEditingController _responsableController = TextEditingController();
  
  // Lista de turnos disponibles
  final List<String> turnos = ['Mañana', 'Tarde', 'Noche'];
  String? selectedTurno;

  @override
  void dispose() {
    _pacienteController.dispose();
    _turnoController.dispose();
    _novedadesController.dispose();
    _responsableController.dispose();
    super.dispose();
  }

  void _submitForm() {
    if (_formKey.currentState?.validate() ?? false) {
      // Aquí irá la lógica para enviar los datos
      final novedad = {
        'id_paciente': _pacienteController.text,
        'turno': selectedTurno,
        'novedades': _novedadesController.text,
        'responsable': _responsableController.text,
      };
      
      // TODO: Implementar la lógica para guardar la novedad
      print(novedad);
    }
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Registrar Novedad'),
      ),
      child: SafeArea(
        child: Form(
          key: _formKey,
          child: ListView(
            padding: const EdgeInsets.all(16.0),
            children: [
              // Campo de Paciente
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Paciente',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  CupertinoTextField(
                    controller: _pacienteController,
                    placeholder: 'Seleccionar paciente',
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      border: Border.all(color: CupertinoColors.systemGrey4),
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Selector de Turno
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Turno',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: CupertinoColors.systemGrey4),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CupertinoButton(
                      padding: const EdgeInsets.all(12),
                      onPressed: () {
                        showCupertinoModalPopup(
                          context: context,
                          builder: (BuildContext context) => Container(
                            height: 216,
                            padding: const EdgeInsets.only(top: 6.0),
                            margin: EdgeInsets.only(
                              bottom: MediaQuery.of(context).viewInsets.bottom,
                            ),
                            color: CupertinoColors.systemBackground.resolveFrom(context),
                            child: SafeArea(
                              top: false,
                              child: CupertinoPicker(
                                magnification: 1.22,
                                squeeze: 1.2,
                                useMagnifier: true,
                                itemExtent: 32.0,
                                onSelectedItemChanged: (int selectedItem) {
                                  setState(() {
                                    selectedTurno = turnos[selectedItem];
                                  });
                                },
                                children: List<Widget>.generate(turnos.length, (int index) {
                                  return Center(child: Text(turnos[index]));
                                }),
                              ),
                            ),
                          ),
                        );
                      },
                      child: Text(
                        selectedTurno ?? 'Seleccionar turno',
                        style: TextStyle(
                          color: selectedTurno == null
                              ? CupertinoColors.systemGrey
                              : CupertinoColors.black,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Campo de Novedades
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Novedades',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  CupertinoTextField(
                    controller: _novedadesController,
                    placeholder: 'Describir las novedades',
                    padding: const EdgeInsets.all(12),
                    maxLines: 5,
                    decoration: BoxDecoration(
                      border: Border.all(color: CupertinoColors.systemGrey4),
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Campo de Responsable
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Responsable',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  CupertinoTextField(
                    controller: _responsableController,
                    placeholder: 'Nombre del responsable',
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      border: Border.all(color: CupertinoColors.systemGrey4),
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),

              // Botón de Guardar
              CupertinoButton.filled(
                onPressed: _submitForm,
                child: const Text('Guardar Novedad'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}