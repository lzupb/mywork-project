package com.pengbo.project.admin.spring.config;

import com.pengbo.project.admin.jpa.repository.IConfDAO;
import com.pengbo.project.admin.jpa.service.ServicePackage;
import com.pengbo.project.admin.service.BussServicePackage;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.orm.hibernate4.HibernateExceptionTranslator;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@Configuration
@EnableJpaAuditing
@EnableTransactionManagement
@EnableAspectJAutoProxy(proxyTargetClass = true)
@EnableJpaRepositories(basePackageClasses = { IConfDAO.class }, excludeFilters = { @ComponentScan.Filter(value = NoRepositoryBean.class) })
@ComponentScan(basePackageClasses = { ServicePackage.class, BussServicePackage.class}, includeFilters = @ComponentScan.Filter(classes = { Service.class }))
public class JpaConfig implements TransactionManagementConfigurer {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(JpaConfig.class);

	private static final String DEFAULT_ENTITY_PACKAGE_PATH = "com.pengbo.project.admin.jpa.entity";

	@Autowired
	private Config config;

	@Autowired
	private DataSource dataSource;
	
	private DataSource dataSource() {
        return dataSource;
    }

	@Bean(name = "transactionManager")
	public PlatformTransactionManager annotationDrivenTransactionManager() {
		return new JpaTransactionManager(entityManagerFactory());
	}

	@Bean
	public JPAQueryFactory jpaQueryFactory() {
		return new JPAQueryFactory(entityManagerFactory().createEntityManager());
	}

	@Bean
	public HibernateExceptionTranslator hibernateExceptionTranslator() {
		return new HibernateExceptionTranslator();
	}

	@Bean(name = "entityManagerFactory")
	@DependsOn(value = {"dataSource"})
	public EntityManagerFactory entityManagerFactory() {
		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		vendorAdapter.setShowSql(config.getBoolean("db.showSql"));
		vendorAdapter.setGenerateDdl(config.getBoolean("db.generateDdl"));

		LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
		factory.setDataSource(dataSource());
		factory.setJpaVendorAdapter(vendorAdapter);
		factory.setJpaPropertyMap(parseJpaProperties());
		factory.setPackagesToScan(parseEntityPackages(config
				.getStringList("db.package")));
		factory.setPersistenceUnitName(config
				.getString("db.persistenceUnitName"));
		factory.afterPropertiesSet();
		return factory.getObject();
	}

	/**
	 * parse jpa properties config
	 * 
	 * @return properties map
	 */
	private Map<String, Object> parseJpaProperties() {
		HashMap<String, Object> props = new HashMap<String, Object>();
		Config jpaProps = config.getConfig("db.jpa.props");
		if (jpaProps.isEmpty()) {
			return props;
		}
		for (Map.Entry<String, ConfigValue> entry : jpaProps.entrySet()) {
			props.put(entry.getKey(), entry.getValue().unwrapped());
		}
		LOGGER.debug("loaded jpa properties from config: {}", props);
		return props;
	}

	/**
	 * 需要扫描的path
	 * 
	 * @param paths
	 *            customer config path
	 * @return String[]
	 */
	private String[] parseEntityPackages(List<String> paths) {
		HashSet<String> ps = new HashSet<String>(paths);
		ps.add(DEFAULT_ENTITY_PACKAGE_PATH); // force load this package
		String[] result = new String[ps.size()];
		return ps.toArray(result);
	}

}
