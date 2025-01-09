// auth_service.dart
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  final String baseUrl = 'http://your-backend-url/auth'; // Ajusta la URL según tu backend
  final storage = SharedPreferences.getInstance();

  // Método para iniciar sesión
  Future<UserModel> login(String username, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'username': username,
          'password': password,
        }),
      );

      if (response.statusCode == HttpStatus.OK) {
        final data = json.decode(response.body);
        // Guardar el token
        final prefs = await storage;
        await prefs.setString('token', data['access_token']);
        
        return UserModel.fromJson(data);
      } else {
        throw Exception('Error de autenticación: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error en el inicio de sesión: $e');
    }
  }

  // Método para obtener el perfil del usuario
  Future<UserModel> getProfile() async {
    try {
      final prefs = await storage;
      final token = prefs.getString('token');

      if (token == null) {
        throw Exception('No hay token de autenticación');
      }

      final response = await http.get(
        Uri.parse('$baseUrl/profile'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == HttpStatus.OK) {
        return UserModel.fromJson(json.decode(response.body));
      } else {
        throw Exception('Error al obtener el perfil: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error al obtener el perfil: $e');
    }
  }

  // Método para cerrar sesión
  Future<void> logout() async {
    final prefs = await storage;
    await prefs.remove('token');
  }

  // Método para verificar si hay una sesión activa
  Future<bool> isAuthenticated() async {
    final prefs = await storage;
    final token = prefs.getString('token');
    return token != null;
  }
}

// user_model.dart
class UserModel {
  final int id;
  final String username;
  final String? email;
  final String? token;

  UserModel({
    required this.id,
    required this.username,
    this.email,
    this.token,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      username: json['username'],
      email: json['email'],
      token: json['access_token'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'email': email,
      'access_token': token,
    };
  }
}

// Ejemplo de uso en un StatefulWidget
class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final AuthService _authService = AuthService();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  Future<void> _login() async {
    setState(() => _isLoading = true);

    try {
      final user = await _authService.login(
        _usernameController.text,
        _passwordController.text,
      );
      
      // Navegar a la pantalla principal después del login exitoso
      //Navigator.pushReplacement(
        //context,
        //MaterialPageRoute(builder: (context) => HomeScreen()),
      //);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString())),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _usernameController,
              decoration: InputDecoration(labelText: 'Username'),
            ),
            SizedBox(height: 16),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: _isLoading ? null : _login,
              child: _isLoading
                  ? CircularProgressIndicator()
                  : Text('Iniciar Sesión'),
            ),
          ],
        ),
      ),
    );
  }
}