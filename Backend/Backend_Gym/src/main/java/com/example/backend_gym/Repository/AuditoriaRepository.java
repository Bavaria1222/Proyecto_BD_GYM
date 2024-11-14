package com.example.backend_gym.Repository;


import com.example.backend_gym.Class.AuditoriaDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@Repository
public class AuditoriaRepository {

    private final JdbcTemplate jdbcTemplate;

    public AuditoriaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<AuditoriaDTO> findAuditoriaByFecha(Date fechaInicio, Date fechaFin) {
        String sql = """
            SELECT username, 
                   obj_name AS tabla, 
                   action_name AS accion, 
                   TO_CHAR(timestamp, 'YYYY-MM-DD HH24:MI:SS') AS fechaHora,
                   returncode, 
                   os_username AS osUsername, 
                   userhost 
            FROM DBA_AUDIT_TRAIL
            WHERE obj_name IN ('GIMNASIO', 'CLIENTE', 'EMPLEADO', 'MEMBRESIA', 'CURSO', 'HISTORIAL_CURSO', 'MAQUINA', 'RUTINA')
              AND action_name IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE')
              AND username IN (
                  SELECT grantee 
                  FROM DBA_ROLE_PRIVS
                  WHERE granted_role IN ('EMPLEADO_MANTENIMIENTO', 'EMPLEADO_INSTRUCTOR', 'CLIENTE', 'SYSTEM')
              )
              AND timestamp BETWEEN ? AND ?
            ORDER BY timestamp DESC
            """;

        return jdbcTemplate.query(sql, new Object[]{fechaInicio, fechaFin}, new AuditoriaRowMapper());
    }

    // RowMapper para mapear el resultado de la consulta a AuditoriaDTO
    private static class AuditoriaRowMapper implements RowMapper<AuditoriaDTO> {
        @Override
        public AuditoriaDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
            AuditoriaDTO auditoria = new AuditoriaDTO();
            auditoria.setUsername(rs.getString("username"));
            auditoria.setTabla(rs.getString("tabla"));
            auditoria.setAccion(rs.getString("accion"));
            auditoria.setFechaHora(rs.getString("fechaHora"));
            auditoria.setReturncode(rs.getInt("returncode"));
            auditoria.setOsUsername(rs.getString("osUsername"));
            auditoria.setUserhost(rs.getString("userhost"));
            return auditoria;
        }
    }
}
