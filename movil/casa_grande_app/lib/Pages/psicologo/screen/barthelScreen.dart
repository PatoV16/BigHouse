import 'package:flutter/material.dart';
import 'package:casa_grande_app/Models/Barthel.model.dart';
import 'package:casa_grande_app/Models/Paciente.model.dart';
import 'package:casa_grande_app/Services/Barthel.service.dart';
import 'package:casa_grande_app/Services/Paciente.service.dart';

class BarthelDetalleScreen extends StatefulWidget {
  final String idPaciente;

  const BarthelDetalleScreen({Key? key, required this.idPaciente}) : super(key: key);

  @override
  _BarthelDetalleScreenState createState() => _BarthelDetalleScreenState();
}

class _BarthelDetalleScreenState extends State<BarthelDetalleScreen> {
  late Future<Paciente?> paciente;
  late Future<Barthel?> barthel;

  @override
  void initState() {
    super.initState();
    paciente = PacienteService().obtenerPacientePorCedula(widget.idPaciente);
    barthel = BarthelService().getBarthelById(widget.idPaciente);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Escala de Barthel'),
        backgroundColor: Colors.teal[700],
        elevation: 0,
      ),
      body: FutureBuilder<List<dynamic>>(
        future: Future.wait([paciente, barthel]),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator(color: Colors.teal[700]));
          } else if (snapshot.hasError) {
            return _buildError('Error: ${snapshot.error}');
          } else if (!snapshot.hasData || snapshot.data![0] == null || snapshot.data![1] == null) {
            return _buildError('No se encontró información del paciente o de la escala de Barthel');
          }

          Paciente paciente = snapshot.data![0] as Paciente;
          Barthel barthel = snapshot.data![1] as Barthel;

          return SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildSection(
                  title: 'Información del Paciente',
                  icon: Icons.person,
                  children: [
                    _buildInfoRow('Nombre:', '${paciente.nombre} ${paciente.apellido}'),
                    _buildInfoRow('C.I.:', paciente.cedula),
                    _buildInfoRow('Fecha de Evaluación:', _formatDate(barthel.fechaEvaluacion ?? DateTime.now())),
                  ],
                ),
                _buildSection(
  title: 'Resultados de la Escala de Barthel',
  icon: Icons.assessment,
  children: _buildBarthelItems(barthel),
),

                _buildSection(
                  title: 'Observaciones',
                  icon: Icons.note,
                  children: [
                    _buildInfoRow('Comentario:', barthel.observaciones ?? 'No especificado'),
                  ],
                ),
                const SizedBox(height: 30),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildError(String message) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.error_outline, size: 48, color: Colors.red),
          const SizedBox(height: 16),
          Text(message, style: const TextStyle(fontSize: 16)),
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }

  Widget _buildSection({required String title, required IconData icon, required List<Widget> children}) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.teal[50],
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(8),
                topRight: Radius.circular(8),
              ),
            ),
            child: Row(
              children: [
                Icon(icon, color: Colors.teal[700]),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.teal),
                ),
              ],
            ),
          ),
          const Divider(height: 1, thickness: 1, color: Colors.teal),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: children,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.grey[800]),
          ),
          const SizedBox(height: 4),
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.grey[50],
              borderRadius: BorderRadius.circular(4),
              border: Border.all(color: Colors.grey[300]!)),
            width: double.infinity,
            child: Text(
              value.isEmpty ? 'No especificado' : value,
              style: const TextStyle(fontSize: 15),
            ),
          ),
        ],
      ),
    );
  }
  List<Widget> _buildBarthelItems(Barthel barthel) {
  final actividades = [
    {'actividad': 'Comer', 'puntaje': barthel.comer},
    {'actividad': 'Traslado', 'puntaje': barthel.traslado},
    {'actividad': 'Aseo Personal', 'puntaje': barthel.aseoPersonal},
    {'actividad': 'Uso de Retrete', 'puntaje': barthel.usoRetrete},
    {'actividad': 'Bañarse', 'puntaje': barthel.banarse},
    {'actividad': 'Desplazarse', 'puntaje': barthel.desplazarse},
    {'actividad': 'Subir Escaleras', 'puntaje': barthel.subirEscaleras},
    {'actividad': 'Vestirse', 'puntaje': barthel.vestirse},
    {'actividad': 'Control de Heces', 'puntaje': barthel.controlHeces},
    {'actividad': 'Control de Orina', 'puntaje': barthel.controlOrina},
  ];

  return actividades
      .where((item) => item['puntaje'] != null) // Filtrar los valores nulos
      .map((item) => _buildInfoRow(item['actividad'].toString(), '${item['puntaje']} puntos'))
      .toList();
}

}