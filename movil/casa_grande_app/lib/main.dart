import 'package:casa_grande_app/Pages/admin/ReferenciaDetalleScreen.dart';
import 'package:casa_grande_app/Pages/admin/actaCompromiso.page.dart';
import 'package:casa_grande_app/Pages/admin/adminDashboard.page.dart';
import 'package:casa_grande_app/Pages/admin/asistencia.page.dart';
import 'package:casa_grande_app/Pages/admin/empleadoList.page.dart';
import 'package:casa_grande_app/Pages/admin/empleado_form.dart';
import 'package:casa_grande_app/Pages/admin/listReferencia.dart';
import 'package:casa_grande_app/Pages/admin/listaActas.dart';
import 'package:casa_grande_app/Pages/admin/paciente_form.dart';
import 'package:casa_grande_app/Pages/admin/verActaCompromiso.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'Pages/admin/actasCompromisoScreen.dart';
import 'firebase_options.dart'; // Asegúrate de importar el archivo generado
import 'package:provider/provider.dart';
import 'package:casa_grande_app/Services/ActaCompromiso.service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Inicializa Firebase con los options generados en firebase_options.dart
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<ActaCompromisoService>(
          create: (_) => ActaCompromisoService(),
        ),
        // Otros providers que necesites
      ],
      child: MaterialApp(
        title: 'Casa Grande',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        // Definimos las rutas de la aplicación
        initialRoute: '/login', // Ruta inicial
        routes: {
          '/login': (context) => AdminDashboard(), // Pantalla de login
          '/registrarPaciente': (context) => const PacienteForm(),
          '/registrarEmpleado': (context) => const EmpleadoForm(),
          '/registrarActaCompromiso': (context) => const ActaCompromisoForm(),
          '/empleadosList': (context) => const EmpleadoListScreen(),
          '/registrarAsistenciaPaciente': (context) => const AsistenciaListScreen(),
          '/referenciaLista': (context) => const ReferenciaListScreen(),
          '/listaActasCompromiso': (context) => const ActaCompromisoListScreen(),
          '/cartaCompomiso': (context) =>  CartaCompromisoScreen(),
          '/verActaCompromiso': (context) {
                                      final args = ModalRoute.of(context)!.settings.arguments as String;
                                      return ActaCompromisoDisplay(idPaciente: args);
                                    },
          '/detalleRefeencia': (context){
                                      final args = ModalRoute.of(context)!.settings.arguments as String;
                                      return ReferenciaDetalleScreen(idPaciente: args);
                                    },
          // Aquí puedes agregar más rutas para otros dashboards
        },
      ),
    );
  }
}