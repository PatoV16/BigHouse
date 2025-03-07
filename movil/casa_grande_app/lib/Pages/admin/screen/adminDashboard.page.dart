import 'package:flutter/cupertino.dart';
import '../../../Widgets/action_button.dart';
import '../../../Widgets/stats_card.dart';

class AdminDashboard extends StatelessWidget {
  const AdminDashboard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Panel Administrativo'),
      ),
      child: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Bienvenido, Administrador',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: CupertinoColors.systemBlue,
                ),
              ),
              const SizedBox(height: 20),

              // Acciones Rápidas
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    ActionButton(
                      label: 'Registrar\nEmpleado',
                      icon: CupertinoIcons.person_add,
                      onPressed: () => Navigator.pushNamed(context, '/registrarEmpleado'),
                    ),
                    ActionButton(
                      label: 'Listar\nEmpleados',
                      icon: CupertinoIcons.list_bullet,
                      onPressed: () => Navigator.pushNamed(context, '/empleadosList'),
                    ),
                    ActionButton(
                      label: 'Asistencia',
                      icon: CupertinoIcons.calendar,
                      onPressed: () => Navigator.pushNamed(context, '/registrarAsistenciaPaciente'),
                    ),
                    ActionButton(
                      label: 'Avisos',
                      icon: CupertinoIcons.bell,
                      onPressed: () => Navigator.pushNamed(context, '/list'),
                    ),
                    ActionButton(
                      label: 'Acta',
                      icon: CupertinoIcons.doc_text,
                      onPressed: () => Navigator.pushNamed(context, '/listaActasCompromiso'),
                    ),
                    ActionButton(
                      label: 'Registrar\nPaciente',
                      icon: CupertinoIcons.person_add,
                      onPressed: () => Navigator.pushNamed(context, '/registrarPaciente'),
                    ),
                    ActionButton(
                      label: 'Referencia',
                      icon: CupertinoIcons.arrow_right_arrow_left,
                      onPressed: () => Navigator.pushNamed(context, '/referenciaLista'),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Resumen de Empleados
              Row(
                children: [
                  Expanded(
                    child: StatsCard(
                      title: 'Total Empleados',
                      value: '120',
                      backgroundColor: CupertinoColors.systemBlue.withOpacity(0.1),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: StatsCard(
                      title: 'Activos',
                      value: '98',
                      backgroundColor: CupertinoColors.systemGreen.withOpacity(0.1),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: StatsCard(
                      title: 'Inactivos',
                      value: '22',
                      backgroundColor: CupertinoColors.systemRed.withOpacity(0.1),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
