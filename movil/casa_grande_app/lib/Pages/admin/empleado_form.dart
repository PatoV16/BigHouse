import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../Models/Empleado.model.dart';
import '../../Services/Empleado.service.dart';
import '../../Widgets/input_field.dart';
import '../../Widgets/date_picker.dart';
import '../../Widgets/submit_button.dart';
import '../../Widgets/message_dialog_button.dart';

class EmpleadoForm extends StatefulWidget {
  const EmpleadoForm({Key? key}) : super(key: key);

  @override
  _EmpleadoFormState createState() => _EmpleadoFormState();
}

class _EmpleadoFormState extends State<EmpleadoForm> {
  final EmpleadoService empleadoService = EmpleadoService();

  final TextEditingController nombreController = TextEditingController();
  final TextEditingController apellidoController = TextEditingController();
  final TextEditingController cedulaController = TextEditingController();
  final TextEditingController telefonoController = TextEditingController();
  final TextEditingController correoController = TextEditingController();

  DateTime fechaContratacion = DateTime.now();
  String _cargo = 'Seleccionar cargo';
  String _estado = 'Activo';

  final List<String> cargos = [
    'Médico', 'Psicólogo', 'Trabajador Social', 'Enfermera', 
    'Administrador', 'Cocinero', 'Terapista', 'Cuidador',
    'Auxiliar de lavandería', 'Servicios Generales', 'Nutricionista'
  ];

  final List<String> estados = ['Activo', 'Inactivo'];

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

 bool validarCampos() {
  String nombre = nombreController.text.trim();
  String apellido = apellidoController.text.trim();
  String cedula = cedulaController.text.trim();
  String telefono = telefonoController.text.trim();
  String correo = correoController.text.trim();

  RegExp regexLetras = RegExp(r'^[a-zA-Z\s]+$');
  RegExp regexCedula = RegExp(r'^\d{10}$');
  RegExp regexTelefono = RegExp(r'^\d{7,10}$');
  RegExp regexCorreo = RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

  if (nombre.isEmpty || !regexLetras.hasMatch(nombre)) {
    mostrarMensaje('Ingrese un nombre válido (solo letras).');
    return false;
  }
  if (apellido.isEmpty || !regexLetras.hasMatch(apellido)) {
    mostrarMensaje('Ingrese un apellido válido (solo letras).');
    return false;
  }
  if (!regexCedula.hasMatch(cedula)) {
    mostrarMensaje('La cédula debe tener exactamente 10 dígitos numéricos.');
    return false;
  }
  if (!regexTelefono.hasMatch(telefono)) {
    mostrarMensaje('El teléfono debe tener entre 7 y 10 dígitos numéricos.');
    return false;
  }
  if (!regexCorreo.hasMatch(correo)) {
    mostrarMensaje('Ingrese un correo electrónico válido.');
    return false;
  }
  if (_cargo == 'Seleccionar cargo') {
    mostrarMensaje('Seleccione un cargo válido.');
    return false;
  }

  return true;
}

  void guardarEmpleado() async {
    if (!validarCampos()) return;

    Empleado nuevoEmpleado = Empleado(
      nombre: nombreController.text,
      apellido: apellidoController.text,
      cedula: cedulaController.text,
      cargo: _cargo,
      fechaContratacion: fechaContratacion,
      telefono: telefonoController.text,
      correo: correoController.text,
      estado: _estado,
    );

    await empleadoService.addEmpleado(nuevoEmpleado);

    mostrarMensaje('Empleado guardado correctamente');

    // Limpiar campos después de guardar
    nombreController.clear();
    apellidoController.clear();
    cedulaController.clear();
    telefonoController.clear();
    correoController.clear();
    setState(() {
      fechaContratacion = DateTime.now();
    });
  }

  void _seleccionarCargo(BuildContext context) {
    showCupertinoModalPopup(
      context: context,
      builder: (_) => CupertinoActionSheet(
        title: const Text("Selecciona un Cargo"),
        actions: cargos.map((cargo) {
          return CupertinoActionSheetAction(
            child: Text(cargo),
            onPressed: () {
              setState(() => _cargo = cargo);
              Navigator.pop(context);
            },
          );
        }).toList(),
        cancelButton: CupertinoActionSheetAction(
          isDefaultAction: true,
          child: const Text("Cancelar"),
          onPressed: () => Navigator.pop(context),
        ),
      ),
    );
  }

  void _seleccionarEstado(BuildContext context) {
    showCupertinoModalPopup(
      context: context,
      builder: (_) => CupertinoActionSheet(
        title: const Text("Selecciona un Estado"),
        actions: estados.map((estado) {
          return CupertinoActionSheetAction(
            child: Text(estado),
            onPressed: () {
              setState(() => _estado = estado);
              Navigator.pop(context);
            },
          );
        }).toList(),
        cancelButton: CupertinoActionSheetAction(
          isDefaultAction: true,
          child: const Text("Cancelar"),
          onPressed: () => Navigator.pop(context),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: const Text('Registrar Empleado'),
        leading: CupertinoNavigationBarBackButton(
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: SingleChildScrollView(
            child: Column(
              children: [
                InputField(placeholder: 'Nombre', controller: nombreController, label: '',),
                const SizedBox(height: 10),
                InputField(placeholder: 'Apellido', controller: apellidoController, label: '',),
                const SizedBox(height: 10),
                InputField(placeholder: 'Cédula', controller: cedulaController, label: '',),
                const SizedBox(height: 10),
                CupertinoButton(
                  color: CupertinoColors.systemGrey4,
                  child: Text(_cargo),
                  onPressed: () => _seleccionarCargo(context),
                ),
                const SizedBox(height: 10),
                DatePickerField(
                  label: 'Fecha de Contratación',
                  selectedDate: fechaContratacion,
                  onDateSelected: (date) => setState(() => fechaContratacion = date),
                ),
                const SizedBox(height: 10),
                InputField(placeholder: 'Teléfono', controller: telefonoController, keyboardType: TextInputType.phone, label: '',),
                const SizedBox(height: 10),
                InputField(placeholder: 'Correo Electrónico', controller: correoController, keyboardType: TextInputType.emailAddress, label: '',),
                const SizedBox(height: 10),
                CupertinoButton(
                  color: CupertinoColors.systemGrey4,
                  child: Text(_estado),
                  onPressed: () => _seleccionarEstado(context),
                ),
                const SizedBox(height: 20),
                SubmitButton(text: 'Guardar Empleado', onPressed: guardarEmpleado),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
